const mongoose = require('mongoose');

const receptionistSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: [true, 'Receptionist must have a user'],
    }
})

const Receptionist = mongoose.model('Receptionist', receptionistSchema);

module.exports = Receptionist;