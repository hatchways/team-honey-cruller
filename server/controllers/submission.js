const Submission = require("../models/Submission");
const Contest = require("../models/Contest");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

exports.createSubmission = asyncHandler(async (req, res) => {
  const artistId = mongoose.Types.ObjectId(req.user.id)
  const contestId = mongoose.Types.ObjectId(req.params.id)
  try {
    //checking if the user for the contest, has already submitted
    const previousSubmission = await Submission.findOne({
      contest: contestId,
      user: artistId,
    });

    if (previousSubmission) {
      previousSubmission.images = previousSubmission.images.concat(
        req.body
      );
      await previousSubmission.save();
      res.status(200).json(previousSubmission);
    } else {
      const submission = await Submission.create({
        contest: req.params.id,
        artistId: req.user.id,
        images: req.body,
      })
      await Contest.findByIdAndUpdate(req.params.id, { $push: { submissions: submission.id }})
      const withArtist = await User.populate(submission, {path: "artistId", select: 'username'})
      res.status(201).json(withArtist);
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
  const userId = mongoose.Types.ObjectId(req.user.id)
  const contestId = mongoose.Types.ObjectId(req.params.id)
  // EXPECTING THE ID OF THE CONTEST IN PARAMS
  Contest.findOne({
    userId,
    _id: contestId
  }).select('submissions').populate({
    path: 'submissions',
    select: '-createdAt -updatedAt -__v',
    populate: {
      path: 'artistId',
      model: 'User',
      select: 'username profilePic'
    }
  }).exec(async (err, contest) => {
    if (err) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        message: 'Failure'
      }));
      res.sendStatus(500);
    } else {
      if (contest) {
        const structured = contest.submissions.map(item => ({
          _id: item._id,
          images: item.images,
          contest: item.contest,
          active: item.active,
          artistName: item.artistId.username,
          artistPic: item.artistId.profilePic,
          artistId: item.artistId._id,
        }))
        res.status(200).send(structured)
      } else {
        res.status(204).send([])
      }
    }
  })
})