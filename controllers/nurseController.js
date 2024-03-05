const PreAssessment = require('../models/preAssessment');
const NurseAssignment = require('../models/assignDoctor');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.patientPreAssessment = catchAsync(async (req, res, next) => {
    const patient = await PreAssessment.create(req.body);

    res.status(201).json({
        status: 'success',
        message: 'Patient has been PreAssessed',
        results: patient.length,
        data: {
            patient
        }
    })
});

exports.assignDoctor = catchAsync(async (req, res, next) => {
    const doctor = await NurseAssignment.create(req.body);

    res.status(201).json({
        status: 'success',
        message: 'Doctor has been assigned',
        results: doctor.length,
        data: {
            doctor
        }
    })
})