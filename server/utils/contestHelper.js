const schedule = require('node-schedule');
const asyncHandler = require("express-async-handler");
const {
  sendMail
} = require('./sendgrid')
const Notification = require('../models/Notification');
const Contest = require('../models/Contest');
const Winner = require('../models/Winner');
const Submission = require('../models/Submission');
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const {
  deleteImages
} = require('./deleteAws');

exports.scheduleContestEnd = asyncHandler(async (contest) => {
  const date = new Date(contest.deadlineDate)
  const {
    email
  } = await User.findOne({
    _id: contest.userId
  })
  const mailObj = {
    to: email,
    from: 'tattooartproject@outlook.com',
    subject: 'Choose A Winner For Your Tattoo Contest',
    text: contest.title,
    html: `<h2>Your contest has ended. Go pick a winner!</h2>`,
  }
  const confirmationMail = {
    to: email,
    from: 'tattooartproject@outlook.com',
    subject: 'Thank you for creating a contest with Tattoo Art',
    text: contest.title,
    html: `<h2>We appreciate you so much. We hope you enjoy your experience.</h2>`,
  }
  try {
    await Notification.create({
      to: contest.userId,
      from: contest.userId,
      notification: 'Thank you for creating a contest!'
    })
    await sendMail(confirmationMail)
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
    return new Error(err)
  }
})

// const stripePay = asyncHandler(async (contestOwner, prizeAmount, winnerId) => {
//   const findContestUser = await User.findOne({
//     _id: contestOwner
//   });

//   const findWinnerUser = await User.findOne({
//     _id: winnerId
//   });


//   const customerContestOwner = await stripe.customers.retrieve(findContestUser.stripeId);


//   const customerWinner = await stripe.customers.retrieve(findWinnerUser.stripeId)

//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: prizeAmount,
//     customer: findContestUser.stripeId,
//     currency: 'usd',
//     payment_method: customerContestOwner.invoice_settings.default_payment_method,
//     payment_method_types: ['card'],
//   });

//   return paymentIntent;
// });

exports.winnerChosen = (contestOwner, submissionId, winningPic) => {
  return new Promise(async (resolve, reject) => {
    const winningSubmission = await Submission.findOne({
      _id: submissionId
    }).populate("contest artistId")
    if (winningSubmission.contest.active) {
      return reject('Contest is still active.')
    }
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
      // await stripePay(contestOwner, winningSubmission.contest.prizeAmount, winningSubmission.artistId._id);
      await Submission.deleteMany({
        _id: {
          $in: winningSubmission.contest.submissions
        }
      })
      await Contest.findByIdAndDelete(winningSubmission.contest._id)
      await deleteImages([...imagesToDelete, ...winningSubmission.contest.images])
      await Notification.create({
        to: contestWinner.winningArtist,
        from: contestWinner.contestOwner,
        notification: "Congratulations you have won a contest!!"
      })
      await sendMail(mailObj)
      return resolve(contestWinner);
    } catch (err) {
      return reject('Could not complete Contest.')
    }
  })
}