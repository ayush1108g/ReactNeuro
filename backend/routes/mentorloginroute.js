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
 
module.exports = router;
