const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    pID: {
        type: String,
        required: true
    }, 
    province: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    packageName: {
        type: String,
        required: true
    },
    vehicle: {
        type: String,
        required: true
    },
    noOfPerson: {
        type: Number,
        required: true
    },
    places: {
        type: String,
        required: true
    },
    meals: {
        type: [String], 
        required: true
    },
    activities: {
        type: String,
        required: true
    },
    accommodation: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Package', packageSchema);
