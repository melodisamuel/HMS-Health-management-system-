const mongoose = require('mongoose');

const SpecimenCollectionSchema = new mongoose.Schema({
    nurse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nurse', // Reference to the Nurse model
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient', // Reference to the Patient model
        required: true
    },
    specimenType: {
        type: String,
        required: true
    },
    collectionDate: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String
    }
});

const SpecimenCollection = mongoose.model('SpecimenCollection', SpecimenCollectionSchema);

module.exports = SpecimenCollection;
