const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const studentsignupSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  phoneno: {
    type: "Number",
    required: true,
    unique: true,
  },
  emailid: {
    type: "string",
    required: true,
    unique: true,
  },
  password: {
    type: "string",
    required: true,
    select: false,
  },
});
studentsignupSchema.pre("save", async function (next) {
  // if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

studentsignupSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const signup = mongoose.model("signup", studentsignupSchema);

module.exports = signup;
