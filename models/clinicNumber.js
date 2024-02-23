const mongoose = require('mongoose');
const crypto = require('crypto');

// Define the ClinicNumber schema
const ClinicNumberSchema = new mongoose.Schema({
    patientName: {
        type: String,
        // required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor', // Reference to the Doctor model
        // required: true,
    },
    visitType: {
        type: String,
        enum: ['Regular', 'Emergency'], // Example visit types
        required: true,
    },
    clinicNumber: {
        type: String,
        unique: true,
        required: true,
    },
    dateIssued: {
        type: Date,
        default: Date.now,
    },
    clinicNumberIssuedAt: Date,
});

// Define the issueClinicNumber method
ClinicNumberSchema.methods.issueClinicNumber = function () {
    const clinicNumber = crypto.randomBytes(12).toString("hex");

    this.clinicNumber = crypto
        .createHash('sha256')
        .update(clinicNumber)                     
        .digest("hex");
    
    return clinicNumber;
};

// Define the ClinicNumber model
const ClinicNumber = mongoose.model('ClinicNumber', ClinicNumberSchema);

module.exports = ClinicNumber;
