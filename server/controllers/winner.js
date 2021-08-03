const asyncHandler = require("express-async-handler");
const Winner = require('../models/Winner');

exports.getWinnersByUser = asyncHandler(async (req, res) => {
  try {
    const winners = await Winner.find({contestOwner: req.user.id}).populate({path: "contestOwner", select: "username email profilePic"}).populate({path: "winningArtist", select: "username email profilePic"})
    res.status(200).json(winners)
  } catch (err) {
    res.status(500).json(err)
  }
})

exports.getSomeWinners = asyncHandler(async (req, res) => {
  try {
    if(isNaN(parseInt(req.params.num))){
      return res.status(400).send("Not a number")
    }
    const winners = await Winner.find({}).limit(+req.params.num)
    res.status(200).json(winners)
  } catch (err) {
    res.status(500).json(err)
  }
})