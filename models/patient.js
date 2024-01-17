const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Patient must have a user'],
        unique: true,
    },
    personalInfo: {
        firstName: {
            type: String,
            required: [true, 'Firstname is required'],
        },
        dateOfBirth: {
            type: Date,
        },
        address: {
            type: String,
        },
        PhoneNumber: {
            type: String,
        },
    },
    medicalHistory: {
        allergies: [{
            type: String,
        }],
        medications: [{
            name: String,
            dosage: String,
            frequency: String,
        }],
    },
    appointments: [{
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        date: {
            type: Date,
        },
        department: {
            type: String,
        },
    }],
    presciptions: [{
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        details: {
            type: String,
        },
        date: {
            type: Date,
        },
    }],
    reports: [{
        type: String,
    }],
    payementHistroy: [{
        date: {
            type: Date,
        },
        amount: {
            type: Number,
        },
    }],
    feedback: {
        type: String,
    },
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;