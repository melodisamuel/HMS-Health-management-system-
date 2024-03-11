const mongoose = require('mongoose');

const MedicationDispenseSchema = new mongoose.Schema({
    prescription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prescription',
        required: true,
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    medicationGiven: {
        type: String,
        required: true,
    },
    quantityGiven: {
        type: Number,
        required: true,
    },
    dispensedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pharmacist',
        required: true,
    },
    dispensingDate: {
        type: Date,
        default: Date.now,
    },
});

const MedicationDispense = mongoose.model('MedicationDispense', MedicationDispenseSchema);

module.exports = MedicationDispense;
