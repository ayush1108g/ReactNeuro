const express = require("express");
const studentsignupcontroller = require("./../controllers/logincontroller");

const router = express.Router();

router
  .route("/signup")
  .get(studentsignupcontroller.getStudentsignup)
  .post(studentsignupcontroller.checkBody,studentsignupcontroller.signup);

router.route("/login").post(studentsignupcontroller.login);
router.route("/forgotpassword").post(studentsignupcontroller.forgotPassword);
router.route("/resetpassword").post(studentsignupcontroller.resetPassword);
module.exports = router;
