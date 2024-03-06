const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Examination = require('../models/examinationResults');
const LabAssistantSpecimen = require('../models/processSpecimen');


exports.ProcessResult = catchAsync(async (req, res, next) => {
    const examination = await Examination.create(req.body);

    res.status(201).json({
        status: "success",
        message: "examination results created successfuly",
        results: examination.length,
        data: {
            examination
        }
    })
});

exports.processSpecimen = catchAsync(async (req, res, next) => {
    const specimen = await LabAssistantSpecimen.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            specimen,
        }
    })
})

