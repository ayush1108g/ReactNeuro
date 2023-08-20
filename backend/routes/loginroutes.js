const express = require("express");
const studentsignupcontroller = require("./../controllers/logincontroller");

const router = express.Router();

router
  .route("/")
  .get(studentsignupcontroller.getStudentsignup)
  .post(studentsignupcontroller.signup);

router.route("/login").post(studentsignupcontroller.login);
module.exports = router;
