const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const seedrandom = require('seedrandom');
var Schema = mongoose.Schema;
const rng = seedrandom('mySeed');
const mentorignupSchema = new Schema({
  name: {
    type: "string",
    required: true,
  },
  emailid: {
    type: "string",
    required: true,
    unique: true,
  },
  password: {
    type: "string",
    required: true,
  },
  id :{
    type: "Number",
  },
 
  code : { type: "Number", required: true},
  passwordChangedAt :Date,
  resetPasswordToken :{
  type:"string",
  },
  passwordresetexpired :Date,
});
mentorignupSchema.pre("save", async function (next) {

  this.password = await bcrypt.hash(this.password, 12);
  next();
});
mentorignupSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
})
mentorignupSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

mentorignupSchema.methods.createpasswordresetpassword =function () {
  // const resetToken =crypto.randomBytes(32).toString('hex');
const resetToken = Math.floor(Math.random() *100000)+ 100000
  // this.resetPasswordToken =  crypto.createHash('sha256').update(resetToken).digest('hex')
this.resetPasswordToken = resetToken;
  console.log({resetToken},this.resetPasswordToken);

  this.passwordresetexpired = Date.now() + 600000;

  return resetToken;
}
const mentor = mongoose.model("mentor", mentorignupSchema);

module.exports = mentor;
