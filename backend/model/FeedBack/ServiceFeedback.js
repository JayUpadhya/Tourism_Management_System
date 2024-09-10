// create data models to data structures

const mongoose = require("mongoose");
const Schema = mongoose.Schema; //schema to create model

//create model
const servicefeedbackSchema = new Schema({
  //blue print for property for use
  id: String,
  name: String,
  email: String,
  rating: Number,
  feedback: String,
});

const servicefeedback = mongoose.model("servicefeedback", servicefeedbackSchema);

module.exports = servicefeedback;
