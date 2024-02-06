const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    manufacturer: {
        type: String,
        required: true,
        trim: true
    },
    dosage: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    expiryDate: {
        type: Date,
        default: Date.now()
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;