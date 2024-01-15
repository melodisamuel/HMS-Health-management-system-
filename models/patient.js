const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Patient must have a user'],
        healthStatus: {
            type: String,
        },
        medicalHistory: {
            type: String,
        }
    },
})

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;