const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create event schema
const eventSchema = new mongoose.Schema(
  {
    eventid: { type: String, required: true },
    eventtype: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;