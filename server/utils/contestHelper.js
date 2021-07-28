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
  const { email } = await User.findOne({
    _id: contest.userId
  })
  const mailObj = {
    to: email,
    from: 'tattooartproject@outlook.com',
    subject: 'Choose A Winner For Your Tattoo Contest',
    text: contest.title,
    html: `<h2>Your contest has ended. Go pick a winner!</h2>`,
  }
  try {
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
    await Submission.remove({
      _id: {
        $in: winningSubmission.contest.submissions
      }
    })
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

function cronChangeDate(str) {
  var toDate = {}
  if (!str) {
    toDate.loopType = 'Single loop'
  } else {
    var result = str.split(' ').join('')
    var nArr = str.split(' ')
    var countData = this.getPlaceholderCount(result)
    if (!countData.count1) { // If there is no'?', it is a weekly cycle
      toDate.loopType = 'Week Loop'
      var keys = nArr[5]
      var en2cnMap = {
        1: 'Weekday',
        2: 'Monday',
        3: 'Tuesday',
        4: 'Wednesday',
        5: 'Thursday',
        6: 'Friday',
        7: 'Saturday'
      }
      var cnKeys = keys.split(',').map(function (key, idx) {
        return en2cnMap[key];
      })
      toDate.loopValue = cnKeys.join(',')
    } else if (countData.count1 + countData.count2 === 3) {
      toDate.loopType = 'Monthly loop'
      var mot = []
      var mkeys = nArr[3].split(',')
      for (var i = 0; i < mkeys.length; i++) {
        let mo = mkeys[i] + 'number'
        mot.push(mo)
      }
      toDate.loopValue = mot.join(',')
    } else {
      toDate.loopType = 'Day loop'
    }
    toDate.loopTime = nArr[2] + ':' + nArr[1] + ':' + nArr[0]
  }

  return toDate

  // console.log(toDate) {loopType: "Monthly Loop", loopValue: "2nd, 4th, 21st", loopTime: "16:30:44"}

}
// Count the number of characters in a string
function getPlaceholderCount(strSource) {
  var count1 = 0 // the number of?
  var count2 = 0 // the number of *
  strSource.replace(/\*|\?/g, function (m, i) {
    if (m === '?') {
      count1++
    } else if (m === '*') {
      count2++
    }
  });
  var obj = {}
  obj.count1 = count1
  obj.count2 = count2
  return obj //return an object, get the desired value according to need
}