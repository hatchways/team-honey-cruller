const Submission = require("../models/Submission");
const Contest = require("../models/Contest");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

exports.createSubmission = asyncHandler(async (req, res) => {
  const artistId = mongoose.Types.ObjectId(req.user.id)
  const contestId = mongoose.Types.ObjectId(req.params.id)
  const body = req.body;
  try {
    //checking if the user for the contest, has already submitted
    const previousSubmission = await Submission.findOne({
      contest: contestId,
      user: artistId,
    });

    if (previousSubmission) {
      previousSubmission.storeUrl = previousSubmission.storeUrl.concat(
        body.storeUrl
      );
      await previousSubmission.save();
      res.status(200).json(previousSubmission);
    } else {
      const submission = await Submission.create({
        contest: req.params.id,
        user: req.user.id,
        active: body.active,
        storeUrl: body.storeUrl,
      });
      res.status(201).json(submission);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

exports.getSubmissionsByUser = asyncHandler(async (req, res) => {
  const artistId = mongoose.Types.ObjectId(req.user.id)
  try {
    const submissions = await Submission.find({ artistId })
    res.send(submissions)
  } catch(err) {
    res.status(500).json(err);
  }
})

exports.getSubmissionByContest = asyncHandler(async (req, res) => {
  const artistId = mongoose.Types.ObjectId(req.user.id)
  const contestId = mongoose.Types.ObjectId(req.params.id)
  // EXPECTING THE ID OF THE CONTEST IN PARAMS
  Contest.findOne({
    userId: artistId,
    _id: contestId
  }).select('submissions').populate({
    path: 'submissions',
    select: '-createdAt -updatedAt -__v',
    populate: {
      path: 'artistId',
      model: 'User',
      select: 'username profilePic'
    }
  }).exec(async (err, { submissions }) => {
    if (err) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        message: 'Failure'
      }));
      res.sendStatus(500);
    } else {
      res.status(200).send(submissions)
    }
  })
})