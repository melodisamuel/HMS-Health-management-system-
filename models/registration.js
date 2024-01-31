const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String, 
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
        unique: true,
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
    role: {
        type: String,
        enum: ["user", "admin", "patient", "receptionist", "doctor", "nurse", "pharmacist"],
        default: 'user',
        required: [true, 'Role is required to register new staff']
    },
});


const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;