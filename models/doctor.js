const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Doctor must have user'],
        schedule: {
            type: String,
        }
    },
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;