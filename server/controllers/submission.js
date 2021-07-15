const asyncHandler = require("express-async-handler");

const Submission = require("../models/Submission");

exports.getContestImages = asyncHandler(async (req, res) => {
	try {
        const singleContestImages = await Submission.find({ contest: req.params.id });

        res.status(200).json(singleContestImages);
    } catch (err) {
        res.status(500).json(err);
    }
}) 
