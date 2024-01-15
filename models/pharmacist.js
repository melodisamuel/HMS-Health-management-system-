const mongoose = require('mongoose');

const pharmacistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Pharmacist must have user'],
    },
});

const Pharmacist = mongoose.model('Pharmist', pharmacistSchema);

module.exports = Pharmacist;