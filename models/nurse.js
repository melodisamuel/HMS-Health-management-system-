const mongoose = require('mongoose');

const nurseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Nurse must have a user'],
        assignedDoctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor'
        },
    }
});

const Nurse = mongoose.model('Nurse', nurseSchema);

module.exports = Nurse;