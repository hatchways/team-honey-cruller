const Contest = require("../models/Contest");
const asyncHandler = require("express-async-handler");
const { scheduleContestEnd, winnerChosen } = require('../utils/contestHelper');

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
    const singleContest = await Contest.findById(req.params.id).select('-__v').populate({path: "userId", select: "username profilePic"});
    const contest = singleContest.toJSON()
    contest.ownerName= contest.userId.username
    contest.ownerProfilePic = contest.userId.profilePic
    contest.userId = contest.userId._id
    res.status(200).json(contest);
  } catch (err) {
    res.status(500).json(err);
  }
})

exports.getAllContests = asyncHandler(async (req, res) => {
  try {
    const allContests = await Contest.find({active: true}).select('-submissions')
    res.status(200).json({
      contests: allContests
    })
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
  try {
    const data = await winnerChosen(req.user.id, req.params.id, req.body.winningPic)
    if (!data.success) {
      throw data
    } else {
      res.status(200).send(data)
    }
  } catch (err) {
    res.status(500).json(false)
  }
})