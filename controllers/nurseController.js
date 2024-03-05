const PreAssessment = require('../models/preAssessment');
const NurseAssignment = require('../models/assignDoctor');
const SpecimenCollection = require('../models/specimen');
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
});

exports.collectSpecimen = catchAsync(async (req, res, next) => {
    const specimen = await SpecimenCollection.create(req.body);

    res.status(201).json({
        status: 'success',
        message: 'Specimen has been collected',
        results: specimen.length,
        data: {
            specimen
        }
    })
})

