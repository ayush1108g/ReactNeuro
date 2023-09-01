const mentorsignup = require("./../schema/mentor/signup");
const jwt = require("jsonwebtoken");
const catchasync = require("./../utils/catchasync");
const AppError = require('./../utils/apperror');
const email = require("./../utils/nodemailer");
const signToken = id => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
}
exports.getmentorsignup = async (req, res) => {
  try {
    const newmentorsignup = await mentorsignup.find();
    res.status(200).json({
      status: "success",
      data: {
        newmentorsignup,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.creatementorsignup = async (req, res,next) => {
  try {
    
    const code = await req.body.code;
    console.log(code);
   
    if(code == 1234){
      const newmentorsignup = await mentorsignup.create(req.body);
      const token = signToken(newmentorsignup._id)
      res.status(201).json({
        status: "success",
        token,
        data: {
          mentorsignup: newmentorsignup,
        },
      });
    }
    else{
      return next(new AppError('Please provide email and password!', 400));
    }
  } catch (err) {
    return next(new AppError('Please provide email and password!', 400));
  }
};
exports.checkBody1 = (req, res, next) => {
  if (!req.body.name || !req.body.emailid || !req.body.password) {
    return res.status(400).json({
      status: "fail",
      message: "someting is missing",
    });
  }
  next();
};
exports.login = catchasync(async (req, res, next) => {
  const { emailid, password } = req.body;
  if (!emailid || !password) {
    console.log("bvufvbe login");
    res.status(400).json({
      status: "fail",
      message: "email or password missing",
    });
  }
  const mentor = await mentorsignup.findOne({ emailid }).select("+password");
  console.log(mentor);
  
  if (
    !mentor ||
    !(await mentor.correctPassword(password, mentor.password))
  ) {
    res.status(401).json({
      status: "fail",
      message: "username or password incorrect",
    });
  }
  const token = signToken(mentor._id)
  res.status(200).json({
    name:mentor.name,
    id:mentor.id,
    status: "success",
    token
  });
});
exports.forgotPassword = catchasync(async (req, res, next) => {
  const user = await mentorsignup.findOne({ emailid: req.body.emailid });
  if (!user)
    return res.status(404).json({ masg: "no such user with this email id" });

  const resetToken = await user.createpasswordresetpassword();
  console.log(resetToken);
  await user.save();
  const code = resetToken;
  console.log(code);
  const message = `Your verification code is \n ${resetToken}\n you didn't forget your password, please ignore this email!`;
  try {
    await email({
      email: user.emailid,
      subject: "Password Reset code",
      message,
      // html: `<a href="${resetUrl}">Reset Password</a>`,
    });
    res.status(200).json({
      status: "success",
      message: "password reset link sent to your email",
      resetToken,
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    console.log(err);
    massage: "reset link invalid";
  }
});
exports.verifycode = async (req, res, next) => {
  const hashtoken = req.body.code;
  console.log(hashtoken);
  const user = await mentorsignup.findOne({
    resetPasswordToken: hashtoken,
    passwordresetexpired: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "your code is invalid",
    });
  }
  // user.password = req.body.password;
  // user.resetPasswordToken = undefined;
  // user.passwordresetexpired = undefined;
  // user.save();
  res.status(200).json({
    status: "success",
    message: "go to next page",
  });
};
exports.resetPassword = async (req, res, next) => {
  const hashtoken = req.params.token;
  console.log(hashtoken);
  const user = await mentorsignup.findOne({
    resetPasswordToken: hashtoken,
    passwordresetexpired: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "password reset link is invalid",
    });
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.passwordresetexpired = undefined;
  user.save();
  res.status(200).json({
    status: "success",
    message: "password changed successfully",
  });
};
