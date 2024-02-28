const mongoose = require('mongoose');

const ExaminationSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient', // Reference to the Patient model
        required: true
    },
    examinationType: {
        type: String,
        required: true
    },
    assistant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LabAssistant', // Reference to the LabAssistant model
        required: true
    },
    datePerformed: {
        type: Date,
        default: Date.now
    },
    results: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'completed'], // Status of the examination
        default: 'pending'
    }
});

const Examination = mongoose.model('Examination', ExaminationSchema);

module.exports = Examination;
