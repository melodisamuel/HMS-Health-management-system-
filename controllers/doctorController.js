const Prescription = require('../models/prescription');
const ResultsAndReports = require('../models/reportAndResults');
const Registration = require('../models/registration');
const Diagnosis = require('../models/diagnosis');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.enterPresciption = catchAsync(async (req, res, next) => {
    const prescription = await Prescription.create(req.body);

    res.status(201).json({
        status: "success",
        message: "Prescription entered succesfully",
        results: prescription.length,
        data: {
            prescription,
        }
    })
})

exports.generateResultsAndReports = catchAsync(async (req, res, next) => {
    const newReportAndResults = await ResultsAndReports.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            doctor: newReportAndResults,
        }
    })
})

exports.diagnosePatient = catchAsync(async (req, res, next) => {
    const diagnosis = await Diagnosis.create(req.body);

    res.status(201).json({
        status: "success",
        results: diagnosis.length,
        data: {
            diagnosis,
        }
    })
})

exports.viewSchedule = catchAsync(async (req, res, next) => {
    const doctor = await Registration.findOne({ role: 'doctor', _id: req.params.id },   { schedule: 1, _id: 0 });

    if (!doctor) {
        return next(new AppError('No doctor found with that id', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            doctor
        }
    })
})

exports.viewNursesSchedule = catchAsync(async (req, res, next) => {
    const nurse = await Registration.findOne({ role: 'nurse', _id: req.params.id }, { schedule: 1, _id: 0 });

    if (!nurse) {
        return next(new AppError('No nurse found with that id', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            nurse
        }
    })
});

exports.viewLabAssistantSchedule = catchAsync(async (req, res, next) => {
    const labAssistant = await Registration.findOne({ role: 'lab assistant', _id: req.params.id }, { schedule: 1, _id: 0 });

    if (!labAssistant) {
        return next(new AppError('No labAssistant found with that id', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            labAssistant
        }
    })
})