const jwt = require("jsonwebtoken");
const student = require("./../schema/student/signup");
const catchasync = require("./../utils/catchasync");

// exports.protect = catchasync(async(req, res, next)=>{
//   let token;
//   if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
//     token = req.headers.authorization.split(" ")[1];
//   }
 
//   if(!token){
//     return res.status(401).json({msg:"No token provided"});
//   }
//   console.log(token);
//   // res.status(200).json({
//   //   msg: "Token verified",
//   // })
// //   const decoded = await jwt.verify(token, process.env.JWT_SECRET);
// // console.log(JSON.stringify(decoded))
// // const fresuser = await student.findById(decoded_.id)
// // if(!fresuser){ return res.status(401).json({msg:"No student found"} )}
//   next();
// })