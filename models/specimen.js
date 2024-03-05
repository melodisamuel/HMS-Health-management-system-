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
    quantity: {
        type: String,
        required: true
    },
    collectionRemarks: {
        type: String
    }
});

const SpecimenCollection = mongoose.model('SpecimenCollection', SpecimenCollectionSchema);

module.exports = SpecimenCollection;
