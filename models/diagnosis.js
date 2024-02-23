const mongoose = require('mongoose');

const diagnosisSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    symptoms: [String], // List of symptoms reported by the patient
    diagnosis: {
        type: String,
        required: true
    },
    treatment: String, // Treatment prescribed for the diagnosed condition
    additionalNotes: String // Additional notes or comments by the doctor
});

const Diagnosis = mongoose.model('Diagnosis', diagnosisSchema);

module.exports = Diagnosis;
