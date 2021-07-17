const Contest = require("../models/Contest");
const asyncHandler = require("express-async-handler");

exports.createContest = asyncHandler(async (req, res) => {
    console.log(req.user)
    try {
        const contest = await Contest.create({
            title: req.body.title,
            description: req.body.description,
            prizeAmount: req.body.prizeAmount,
            deadlineDate: req.body.deadlineDate,
            userId: req.user.id
        });
        res.status(201).json(contest);
    } catch (err) {
        res.status(500).json(err);
    }
})

exports.updateContest = asyncHandler(async (req, res) => {
    try {
        const update = await Contest.findOneAndUpdate({
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
        const singleContest = await Contest.findById(req.params.id);

        res.status(200).json(singleContest);
    } catch (err) {
        res.status(500).json(err);
    }
})

exports.getAllContests = asyncHandler(async (req, res) => {
    try {
        const allContests = await Contest.find({})

        res.status(200).json({
            contests: allContests
        })
    } catch (err) {
        res.status(500).json(err);
    }
})