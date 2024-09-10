const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  vehicleType: {
    type: String,
    required: true,
  },
  vehicle: {
    type: String,
    required: true,
  },
  driver: {
    type: Boolean,
    default: false,
  },
  rentalDate: {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  location: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  passportOrId: {
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
  totalFee: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Posts", postSchema);
