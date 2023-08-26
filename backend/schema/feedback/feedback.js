const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const feedback = new Schema({
    name: {
        type: String,
        required: true
    },
email: { 
    type: String,
    required: true},
phoneno:{
    type: String,
    required: true
},
massage:{
    type: String,
    required: true
}
})
const Feedback = mongoose.model("feedback", feedback);

module.exports = Feedback;