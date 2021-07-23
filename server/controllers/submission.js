const Submission = require("../models/Submission");
const asyncHandler = require("express-async-handler");

exports.createSubmission = asyncHandler(async (req, res) => {
  const body = req.body;
  console.log(req.body);
  try {
    //checking if the user for the contest, has already submitted
    const previousSubmission = await Submission.findOne({
      contest: req.params.id,
      user: req.user.id,
    });

    if (previousSubmission) {
      previousSubmission.images = previousSubmission.images.concat(body);
      await previousSubmission.save();
      res.status(200).json(previousSubmission);
    } else {
      const submission = await Submission.create({
        contest: req.params.id,
        artistId: req.user.id,
        images: body,
      });
      const withArtist = await User.populate(submission, {
        path: "artistId",
        select: "username",
      });
      res.status(201).json(withArtist);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
