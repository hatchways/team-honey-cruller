const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth')

const { createMessage, getAllConvos, getOneConvo } = require("../controllers/convo")

router.route("/")
.get(protect, getAllConvos)
.post(protect, createMessage)

router.route("/:friendId")
  .get(protect, getOneConvo)

module.exports = router;
