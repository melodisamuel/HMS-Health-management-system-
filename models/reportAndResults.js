const mongoose = require('mongoose');

const resultsAndReportsSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    type: {
        type: String,
        enum: ['result', 'report'],
        required: true
    },
    testType: {
        type: String,
        required: function() {
            return this.type === 'result'; // Test type is required only for results
        }
    },
    testDate: {
        type: Date,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    // Add more fields as needed
});

const ResultsAndReports = mongoose.model('ResultsAndReports', resultsAndReportsSchema);

module.exports = ResultsAndReports;
