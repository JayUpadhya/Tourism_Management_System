const mongoose = require('mongoose');

const { Schema } = mongoose;

const EmployeeLeaveSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    leaveType: {
        type: String,
        required: true
    },
    leaveFrom: {
        type: Date,
        required: true
    },
    leaveTo: {
        type: Date,
        required: true
    },
    leaveStatus: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("EmployeeLeave", EmployeeLeaveSchema);