const mongoose = require("mongoose"); //Import the mongoose library, Which provide an interface for MongoDB

const uniqueValidator = require('mongoose-unique-validator');

//Define the schema for the ticket collection in MongoDB
const ticketSchema = new mongoose.Schema(
    {
      //Define the 't_id' feild of type String , which must be unique and required
      t_id: {
        type: String,
        unique: true,
        required: true
        },
      name: {
        type: String,
        required: true
      },
        email: {
          type: String,
          required: true
        },
        issueType: {
          type: String,
          required: true
        },

        issue: {
          type: String,
          required: true
        }
    },
      {
        //Enable timestamps, which automatically adds 'createAt' and 'updateAt' fields to documents
        timestamps: true,
      }
);

//Apply the uniqueValidator plugin to the tickeSchema, with a custom error message
ticketSchema.plugin(uniqueValidator,{message: 'Error, expected {PATH} is Already Exists.'});

//Export the mongoose model for the 'ticket' collection, using the ticketSchema
module.exports = mongoose.model('ticket', ticketSchema);
