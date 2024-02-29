const mongoose = require('mongoose');

const ExaminationRecommendationSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient', // Reference to the Patient model
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor', // Reference to the Doctor model
        required: true
    },
    examinations: {
        type: String, // You can adjust the type based on the nature of examinations
        required: true
    },
    recommendationDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'completed'], // You can define other statuses as needed
        default: 'pending'
    }
});

const ExaminationRecommendation = mongoose.model('ExaminationRecommendation', ExaminationRecommendationSchema);

module.exports = ExaminationRecommendation;
