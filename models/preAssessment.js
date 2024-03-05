const mongoose = require('mongoose');

const PreAssessmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient', // Reference to the Patient model
        required: true
    },
    nurse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nurse', // Reference to the Nurse model
        required: true
    },
    vitalSigns: {
        // Include fields for vital signs like blood pressure, pulse rate, temperature, etc.
        // You can define these fields based on the specific requirements of your application
    },
    symptoms: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    assessmentDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'completed'], // Status of the assessment
        default: 'pending'
    }
});

const PreAssessment = mongoose.model('PreAssessment', PreAssessmentSchema);

module.exports = PreAssessment;
