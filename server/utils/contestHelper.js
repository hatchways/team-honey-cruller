const schedule = require('node-schedule');
const {
  sendMail
} = require('./sendgrid')
const Notification = require('../models/notification');
const Contest = require('../models/contest');

exports.scheduleContestEnd = async (contest) => {
  const date = new Date(contest.deadlineDate)
  const mailObj = {
    to: "tylerbolty@gmail.com",
    from: 'tattooartproject@outlook.com',
    subject: 'Choose A Winner For Your Tattoo Contest',
    text: contest.title,
    // html: `<h2>hello</h2>`,
    template_id: 'd-25a65a6e395f4a719be2c82ada87ece1'
  }
  try {
    // change format of date to match node-schedule documentation. Wait for final format from Minh and Brian
    schedule.scheduleJob(date, async function () {
      sendMail(mailObj)
      await Notification.create({
        to: contest.userId,
        from: contest.userId,
        notification: 'Your contest has ended. It\'s time to choose a winner'
      })
      await Contest.findByIdAndUpdate(contest._id, {
        $set: {
          active: false
        }
      }, { new: true })
    });
  } catch (err) {
    throw new Error(err)
  }
}
