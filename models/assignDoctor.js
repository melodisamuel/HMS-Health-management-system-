const NurseAssignmentSchema = new mongoose.Schema({
    nurse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nurse',
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    assignedDoctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    assignmentDate: {
        type: Date,
        default: Date.now
    },
    // Other assignment details can be added as needed
});

const NurseAssignment = mongoose.model('NurseAssignment', NurseAssignmentSchema);

module.exports = NurseAssignment;