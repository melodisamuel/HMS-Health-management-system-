const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Examination = require('../models/examination');


exports.examinationResult = catchAsync(async (req, res, next) => {
    const examination = await Examination.create(req.body);

    res.status(201).json({
        status: "success",
        message: "examination results created successfuly",
        results: examination.length,
        data: {
            examination
        }
    })
})