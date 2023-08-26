const Studentsignup = require("./../schema/student/signup");

const jwt = require("jsonwebtoken");
const catchasync = require("./../utils/catchasync");
const email = require("./../utils/nodemailer");
const signToken = id => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
}

exports.getStudentsignup = async (req, res) => {
  try {
    const newstudentsignup = await Studentsignup.find();
    
    res.status(200).json({
      status: "success",
      data: {
        newstudentsignup,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.getStudent = catchasync(async (req, res,next) => {
 
    console.log(req.params.id)
    console.log("sdjndig")
    const newStudent = await Studentsignup.findById(req.params.id)
   if(!newStudent){
    return res.status(404).json({
      status: "fail",
      message: "Student not found",
    });
   }
    console.log(Studentsignup)
  res.status(200).json({
    status: "success",
    data: {
      newStudent
    },
  });
  }
)
exports.signup = async (req, res) => {
  try {
    console.log("signup.....  ", req.body);

    const newStudentsignup = await Studentsignup.create(req.body);
    const token = signToken(newStudentsignup._id)
    res.status(201).json({
      token,
      data: {
        Studentsignup: newStudentsignup,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      massage: "invalid1 request",
    });
  }
};
exports.checkBody = (req, res, next) => {
  if (
    !req.body.name ||
    !req.body.emailid ||
    !req.body.phoneno ||
    !req.body.password
  ) {
    return res.status(400).json({
      status: "fail",
      message: "somthing is missing ]",
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
  const student = await Studentsignup.findOne({ emailid }).select("+password");
  console.log(student);
  // const correct = await Studentsignup.correctPassword(
  //   password,
  //   Studentsignup.password
  // );
  if (
    !student ||
    !(await student.correctPassword(password, student.password))
  ) {
    res.status(401).json({
      status: "fail",
      message: "username or password incorrect",
    });
  }
  const token = signToken(student._id)
  res.status(200).json({
    status: "success",
    name:student.name,
    token
  });
});
exports.forgotPassword =  catchasync (async (req,res,next)=>{

  const user = await Studentsignup.findOne({ emailid: req.body.emailid });
  if(!user) return res.status(404).json({masg:'error',});

  const resetToken = await user.createpasswordresetpassword();
  console.log(resetToken);
//  await user.save();
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/student/resetpassword/${resetToken}`;
  console.log(resetUrl);
  
  await email({
    from: process.env.EMAIL_FROM,
    // to: req.body.emailid,
    subject: "Password Reset Link",
    html: `<a href="${resetUrl}">Reset Password</a>`,
  });
  res.status(200).json({
    status: "success",
    message: "password reset link sent to your email",
    resetToken
  });
 
});
exports.resetPassword = (req,res,next)=>{}