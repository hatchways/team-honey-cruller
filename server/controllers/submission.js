const Submission = require("../models/Submission");
const asyncHandler = require("express-async-handler");
const Contest = require("../models/Contest");

exports.createSubmission = asyncHandler(async (req, res) => {
  try {
    //checking if the user for the contest, has already submitted
    const previousSubmission = await Submission.findOne({
      contest: req.params.id,
      user: req.user.id,
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
