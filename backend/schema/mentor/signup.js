const mongoose = require("mongoose");

const mentorignupSchema = new mongoose.Schema({
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
});
const signup = mongoose.model("signup", mentorignupSchema);

module.exports = signup;
