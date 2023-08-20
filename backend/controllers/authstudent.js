const jwt = require("jsonwebtoken");
const student = require("./../schema/student/signup");
const catchasync = require("./../utils/catchasync");
exports.signup = catchasync(async (req, res, next) => {
  const newstudent = await jwt.sign();
});
