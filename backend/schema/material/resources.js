const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var Schema = mongoose.Schema;
const dateString = Date.now().toString();
const dateObject = new Date(dateString);
const day = dateObject.getDate();
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
  date: {
    type: Date,
    default: Date.now(),
    
  },
  time:{
    type: String,
   
    
  }
});
const filesSchema = new Schema({
  filename:"string",
      path:"string",
})
const Resources = mongoose.model("Resources", resourcesSchema);
const files = mongoose.model("Files", filesSchema);
module.exports = Resources,files;