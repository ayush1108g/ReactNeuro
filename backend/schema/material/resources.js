const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var Schema = mongoose.Schema;

const resourcesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const Resources = mongoose.model("Resources", resourcesSchema);

module.exports = Resources;