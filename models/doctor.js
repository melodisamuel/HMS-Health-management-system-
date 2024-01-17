const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    firsName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String, 
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
    },
    speciality: {
        type: String,
        required: true,
    },
    schedule: [{
        day: String,
        startTime: String,
        endTime: String,
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;