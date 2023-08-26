const express = require("express");
const studentsignupcontroller = require("./../controllers/logincontroller");

const router = express.Router();

router
  .route("/signup")
  .get(studentsignupcontroller.getStudentsignup)
  .post(studentsignupcontroller.checkBody,studentsignupcontroller.signup);

router.route("/login").post(studentsignupcontroller.login);
router.route("/forgotpassword").patch(studentsignupcontroller.forgotPassword);
router.route("/resetpassword").patch(studentsignupcontroller.resetPassword);
router.route("/signup/:id").get(studentsignupcontroller.getStudent);
module.exports = router;
