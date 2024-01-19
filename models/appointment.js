const mongoose = require('mongoose');


const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    notes: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updateAt: {
        type: Date, 
    },
})

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;