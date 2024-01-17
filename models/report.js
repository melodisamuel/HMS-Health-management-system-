const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    results: String,
    comments: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;