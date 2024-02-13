const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    specialty: {
        type: String,
        required: true
    },
    contact: {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            unique: true,
        }
    },
    address: {
        type: String
    },
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
