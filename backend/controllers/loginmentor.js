const mentorsignup = require("./../schema/mentor/signup");
const jwt = require("jsonwebtoken");
const catchasync = require("./../utils/catchasync");
const AppError = require('./../utils/apperror');
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
    status: "success",
    token
  });
});
