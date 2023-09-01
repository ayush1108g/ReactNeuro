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
const filesSchema = new Schema({
  filename:"string",
      path:"string",
})
const Resources = mongoose.model("Resources", resourcesSchema);
const files = mongoose.model("Files", filesSchema);
module.exports = Resources,files;