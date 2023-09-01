const express = require("express");
const feedbackcontroller = require("./../controllers/feedbackcontroller");

const router = express.Router();
router.route('/').post(feedbackcontroller.postfeedback)
router.route('/file').post(feedbackcontroller.postfile)

module.exports = router;