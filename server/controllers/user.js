const User = require("../models/User");
const Contest = require("../models/Contest");
const asyncHandler = require("express-async-handler");

// @route POST /users
// @desc Search for users
// @access Private
exports.searchUsers = asyncHandler(async (req, res, next) => {
  const searchString = req.query.search;

  let users;
  if (searchString) {
    users = await User.find({
      username: {
        $regex: searchString,
        $options: "i",
      },
    });
  }

  if (!users) {
    res.status(404);
    throw new Error("No users found in search");
  }

  res.status(200).json({
    users: users,
  });
});

exports.getContestByUser = asyncHandler(async (req, res, next) => {
  try {
    const allContests = await Contest.find({
      userId: req.user.id,
    });

    res.status(200).json({
      contests: allContests,
    });
  } catch (err) {
    res.status(404).json(err);
  }
});
