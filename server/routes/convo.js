const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth')

const { createMessage, getAllConvos, getOneConvo } = require("../controllers/convo")

router.route("/")
  .get(getAllConvos)
  .post(createMessage)

router.route("/:friendId")
  .get(getOneConvo)

module.exports = router;
