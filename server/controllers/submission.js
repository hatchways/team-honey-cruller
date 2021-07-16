const Submission = require("../models/Submission");
const asyncHandler = require("express-async-handler");

exports.createSubmission = asyncHandler(async (req, res) => {
  const body = req.body;
  try {
    //checking if the user for the contest, has already submitted
    const previousSubmission = await Submission.findOne({
      contest: req.params.id,
      user: req.user.id,
    });

    if (previousSubmission) {
      previousSubmission.storeUrl = previousSubmission.storeUrl.concat(
        body.storeUrl
      );
      await previousSubmission.save();
      res.status(201).json(previousSubmission);
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
