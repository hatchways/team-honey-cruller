const Contest = require("../models/Contest");
const asyncHandler = require("express-async-handler");
const {
  scheduleContestEnd,
  winnerChosen
} = require('../utils/contestHelper');

exports.getNumContests = asyncHandler(asyncHandler(async (req, res) => {
  try {
    const contests = await Contest.find({active: true})
    if(contests) {
      res.status(200).json(contests.length)
    }
  } catch (err) {
    res.status(500).send(err)
  }
}))

exports.createContest = asyncHandler(async (req, res) => {
  try {
    const contest = await Contest.create({
      title: req.body.title,
      description: req.body.description,
      prizeAmount: req.body.prizeAmount,
      deadlineDate: req.body.deadlineDate,
      userId: req.user.id,
      images: req.body.images
    });
    scheduleContestEnd(contest)
    res.status(201).json(contest);
  } catch (err) {
    res.status(500).json(err);
  }
})

exports.updateContest = asyncHandler(async (req, res) => {
  try {
    const update = await Contest.findOneAndUpdate({
      active: true,
      _id: req.params.id
    }, req.body, {
      new: true
    });
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json(err);
  }
});

exports.getSingleContest = asyncHandler(async (req, res) => {
  try {
    const singleContest = await Contest.findById(req.params.id).select('-__v').populate({
      path: "userId",
      select: "username profilePic"
    });
    const contest = singleContest.toJSON()
    contest.ownerName = contest.userId.username
    contest.ownerProfilePic = contest.userId.profilePic
    contest.userId = contest.userId._id
    res.status(200).json(contest);
  } catch (err) {
    res.status(500).json(err);
  }
})

exports.getAllContests = asyncHandler(async (req, res) => {
  try {
    let {
      deadlineDate,
      howMany,
      page
    } = req.query

    if (deadlineDate) {
      const allContests = await Contest.find({
        active: true,
        deadlineDate: {
          $lte: deadlineDate
        }
      }).sort({
        deadlineDate: 1
      }).skip(howMany * page).limit(+howMany)
      if (!allContests) {
        return res.status(404).json({
          message: 'Could not retrieve contests'
        })
      }
      res.status(200).json({
        contests: allContests
      });
    } else {
      const allContests = await Contest.find({
        active: true
      }).sort({
        deadlineDate: 1
      }).skip(howMany * page).limit(+howMany)
      if (!allContests) {
        return res.status(404).json({
          message: 'Could not retrieve contests'
        })
      }
      res.status(200).json({
        contests: allContests
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
})

exports.getAllContestsByUser = asyncHandler(async (req, res) => {
  try {
    const allContests = await Contest.find({
      userId: req.user.id
    })
    res.status(200).json({
      contests: allContests
    })
  } catch (err) {
    res.status(500).json(err);
  }
})

// req.params should be the id of the winning submission
// req.body.winningPic should be the winning image url string
exports.chooseWinner = asyncHandler(async (req, res) => {
  winnerChosen(req.user.id, req.params.id, req.body.winningPic)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).send(err))
})