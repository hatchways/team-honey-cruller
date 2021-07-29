const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const {
  OAuth2Client
} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @route POST /auth/register
// @desc Register user
// @access Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const {
    username,
    email,
    password
  } = req.body;

  const emailExists = await User.findOne({
    email
  });

  if (emailExists) {
    res.status(400);
    throw new Error("A user with that email already exists");
  }

  const usernameExists = await User.findOne({
    username
  });

  if (usernameExists) {
    res.status(400);
    throw new Error("A user with that username already exists");
  }
  
  const customer = await stripe.customers.create({
    email: email,
    name: username
  });

  const user = await User.create({
    username,
    email,
    password,
    stripeId: customer.id
  });

  if (user) {
    const token = generateToken(user._id);
    const secondsInWeek = 604800;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000
    });



    res.status(201).json({
      success: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          profilePic: user.profilePic,
          stripeId: customer.id
        }
      }
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @route POST /auth/login
// @desc Login user
// @access Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const {
    email,
    password
  } = req.body;

  const user = await User.findOne({
    email
  });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    const secondsInWeek = 604800;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000
    });

    res.status(200).json({
      success: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          profilePic: user.profilePic,
          stripeId: user.stripeId
        }
      }
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @route GET /auth/user
// @desc Get user data with valid token
// @access Private
exports.loadUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json({
    success: {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
        stripeId: user.stripeId
      }
    }
  });
});

// @route GET /auth/logout
// @desc Logout user
// @access Public
exports.logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");

  res.send("You have successfully logged out");
});

exports.googleLogin = asyncHandler(async (req, res, next) => {
  const {
    tokenId
  } = req.body;

  client.verifyIdToken({
    idToken: tokenId,
    audience: process.env.GOOGLE_CLIENT_ID
  }).then(response => {
    const {
      email_verified,
      name,
      email
    } = response.payload

    if (email_verified) {
      User.findOne({
          email: email
        })
        .exec((err, user) => {
          if (err) {
            return res.status(400).json({
              error: "This user doesn't exist, sign up first"
            })
          } else {
            if (user) {
              const {
                _id,
                username,
                email,
                stripeId
              } = user;

              const token = generateToken(_id);
              const secondsInWeek = 604800;

              res.cookie("token", token, {
                httpOnly: true,
                maxAge: secondsInWeek * 1000
              });

              res.status(200).json({
                success: {
                  user: {
                    id: _id,
                    username: username,
                    email: email,
                    stripeId: stripeId
                  }
                }
              });
            }
          }

        })
    }
  });
})