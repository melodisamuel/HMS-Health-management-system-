const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
        mdedications: [{
            name: String,
            dosage: String,
        }],
        instructions: String,
        createdAt: {
            type: Date,
            default: Date.now()
        },
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;