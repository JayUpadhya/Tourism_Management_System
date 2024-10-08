// Importing the mongoose module for database operations
const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

// Define the schema for the order, specifying the structure and validation
const orderSchema = new mongoose.Schema({
    o_id: {
        type: Number,
        unique: true,
    },
    customername: {
        type: String,
        required: true
    },
    selectcountry: {
        type: String,
        required: true
    },
    
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    billingaddress: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
});

//this is autogenarating  part for id
// Plugin for unique validation
orderSchema.plugin(uniqueValidator, { message: 'Error, {PATH} is Already Exists.' });

// Pre-save middleware to generate o_id
orderSchema.pre('save', async function(next) {
    try {
        // Generate a random 6-digit numeric ID
        const generatedId = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number
        this.o_id = generatedId; // Assign generated ID to the o_id field
        next(); // Continue with the save operation
    } catch (error) {
        next(error); // Pass error to next middleware
    }
});

module.exports = mongoose.model('order', orderSchema);