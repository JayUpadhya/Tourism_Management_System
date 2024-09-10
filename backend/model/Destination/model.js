const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    id: Number,
    title: String,
    description: String,
    url: String
});

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;