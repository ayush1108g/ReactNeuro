const express = require("express");
const mentorsignupcontroller = require("./../controllers/loginmentor");

const router = express.Router();

router
  .route("/")
  .get(mentorsignupcontroller.getmentorsignup)
  .post(
    mentorsignupcontroller.checkBody,
    mentorsignupcontroller.creatementorsignup
  );

module.exports = router;
