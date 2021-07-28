const schedule = require('node-schedule');
const {
  sendMail
} = require('./sendgrid')
const Notification = require('../models/Notification');
const Contest = require('../models/Contest');
const Winner = require('../models/Winner');
const Submission = require('../models/Submission');

exports.scheduleContestEnd = async (contest) => {
  const date = new Date(contest.deadlineDate)
  const mailObj = {
    to: "tylerbolty@gmail.com",
    from: 'tattooartproject@outlook.com',
    subject: 'Choose A Winner For Your Tattoo Contest',
    text: contest.title,
    html: `<h2>hello</h2>`,
    // template_id: 'd-25a65a6e395f4a719be2c82ada87ece1'
  }
  try {
    // change format of date to match node-schedule documentation. Wait for final format from Minh and Brian
    schedule.scheduleJob(date, async function () {
      await Contest.findByIdAndUpdate(contest._id, {
        $set: {
          active: false
        }
      }, {
        new: true
      })
      await Notification.create({
        to: contest.userId,
        from: contest.userId,
        notification: 'Your contest has ended. It\'s time to choose a winner'
      })
      await sendMail(mailObj)
    });
  } catch (err) {
    throw new Error(err)
  }
}

exports.winnerChosen = async (contestOwner, submissionId, winningPic) => {
  const winningSubmission = await Submission.findOne({
    _id: submissionId
  }).populate("contest artistId")
  const imagesToDelete = winningSubmission.images.filter(image => image !== winningPic)
  const mailObj = {
    to: winningSubmission.artistId.email,
    from: 'tattooartproject@outlook.com',
    subject: 'Congratulations your design won the contest!',
    text: winningSubmission.contest.title,
    html: `<h2>Congratulations on winning the contest!</h2>`,
  }
  const contestWinner = new Winner({
    contestOwner,
    winningArtist: winningSubmission.artistId._id,
    winningPic: winningPic,
    title: winningSubmission.contest.title,
    description: winningSubmission.contest.description,
    prizeAmount: winningSubmission.contest.prizeAmount
  })
  try {
    await contestWinner.save();
    await Submission.remove({ _id: {$in: winningSubmission.contest.submissions}})
    await Contest.findByIdAndDelete(winningSubmission.contest._id)
    // Call brian's function to delete many images from aws (imagesToDelete and winningSubmission.contest.images)
    await Notification.create({
      to: contestWinner.winningArtist,
      from: contestWinner.contestOwner,
      notification: "Congratulations you have won a contest!!"
    })
    await sendMail(mailObj)
    return true;
  } catch (err) {
    return err
  }
}