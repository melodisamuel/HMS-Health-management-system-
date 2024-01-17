const mongoose = require('mongoose');

const pharmacistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String, 
        required: true,
        unique: true, 
    },
    phoneNumber: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

const Pharmacist = mongoose.model('Pharmist', pharmacistSchema);

module.exports = Pharmacist;