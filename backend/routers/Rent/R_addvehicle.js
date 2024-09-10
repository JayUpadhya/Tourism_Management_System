const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  vehicleType: {
    type: String,
    required: true,
  },
  vehicleno: {
    type: String,
    required: true,
  },
  Owner: {
    type: String,
    required: true,
  },
  Ownerid: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Vehicles", postSchema);
