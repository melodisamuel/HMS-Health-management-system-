const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Patient must have a user'],
        unique: true,
    },
    medicalHistory: {
        medications: {
            name: String,
            dosage: String,
            frequency: String,
        },
        allergies: String,
    },
    appointments: {
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        date: Date,
        department: String,
    },
    prescriptions: {
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        details: String,
        date: Date,
    },
    reports: String,
    feedback: String,
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
