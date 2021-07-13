const Contest = require("../models/Contest");
const asyncHandler = require("express-async-handler");

exports.createContest = asyncHandler(async (req, res) => {
    try {
        // expecting req.body to come back in this format.
        // {
        // title: req.body.title,
        // description: req.body.description,
        // prizeAmount: req.body.prizeAmount,
        // deadlineDate: req.body.deadlineDate,
        // not positive how the userid is going to come from the front-end, leaving req.body for now, will change based on how id is being sent from front to back. 
        // userId: req.body.userId
        // }
        const contest = await Contest.create(req.body);
        res.status(200).json(contest);
    } catch (err) {
        res.status(404).json(err);
    }
})

exports.updateContest = asyncHandler(async (req, res) => {
    try {
        const update = await Contest.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                [req.body.key]: req.body.update
            }
        }, {
            new: true
        });

        res.status(200).json(update)
    } catch (err) {
        res.status(404).json(err);
    }
});

exports.getSingleContest = asyncHandler(async (req, res) => {
    try {
        const singleContest = await Contest.findById(req.params.id);

        res.status(200).json(singleContest);
    } catch (err) {
        res.status(404).json(err);
    }
})

exports.getAllContests = asyncHandler(async (req, res) => {
    try {
        const allContests = await Contest.find({})

        res.status(200).json(allContests)
    } catch (err) {
        res.status(404).json(err);
    }
})