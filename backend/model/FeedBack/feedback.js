// create data models to data structures

const mongoose = require("mongoose");
const Schema = mongoose.Schema; //schema to create model

//create model
const feedbackSchema = new Schema({
  //blue print for property for use
  id: String,
  name: String,
  email: String,
  travelguide: String,
  rating: Number,
  feedback: String,
});

const feedback = mongoose.model("feedback", feedbackSchema);

module.exports = feedback;
