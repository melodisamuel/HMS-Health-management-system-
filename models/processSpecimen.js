const mongoose = require('mongoose');

const LabAssistantSpecimenSchema = new mongoose.Schema({
    labAssistant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LabAssistant',
        required: true
    },
    specimenCollection: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NurseSpecimen',
        required: true
    },
    processingDate: {
        type: Date,
        default: Date.now
    },
    processingResults: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    }
});

const LabAssistantSpecimen = mongoose.model('LabAssistantSpecimen', LabAssistantSpecimenSchema);

module.exports = LabAssistantSpecimen;
