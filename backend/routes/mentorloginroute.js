const express = require("express");
const mentorsignupcontroller = require("./../controllers/loginmentor");

const router = express.Router();

router
  .route("/signup")
  .get(mentorsignupcontroller.getmentorsignup)
  .post(
    mentorsignupcontroller.checkBody1,
    mentorsignupcontroller.creatementorsignup
  );
  router.route("/login").post(mentorsignupcontroller.login);
  router.route("/forgotpassword").post(mentorsignupcontroller.forgotPassword);
  router.route("/verifycode").post(mentorsignupcontroller.verifycode);
  router.route("/resetpassword/:token").patch(mentorsignupcontroller.resetPassword);
module.exports = router;
