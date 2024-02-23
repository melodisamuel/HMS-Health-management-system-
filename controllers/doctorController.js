const Prescription = require('../models/prescription');
const ResultsAndReports = require('../models/reportAndResults')
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

