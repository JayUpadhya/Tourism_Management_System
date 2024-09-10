const mongoose = require("mongoose");

// Create model
const pUserSchema = new mongoose.Schema({
  province: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  places: {
    type: String,
    required: true,
  },
  duration: {
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
  },
  vehicle: {
    type: String,
    required: true,
  },
  noOfPerson: {
    type: Number,
    required: true,
  },
  meals: {
    type: [String],
    required: true,
  },
  activities: {
    type: String,
    required: true,
  },
  accommodation: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

// Export the model
module.exports = mongoose.model("packageUser", pUserSchema);
