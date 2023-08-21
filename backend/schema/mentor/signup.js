const mongoose = require("mongoose");
var Schema = mongoose.Schema;
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
});
const mentor = mongoose.model("mentor", mentorignupSchema);

module.exports = mentor;
