const Patient = require('../models/patient')
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.registerPatient = catchAsync(async (req, res, next) => {
    const newPatient = await Patient.create(req.body) 

    res.status(201).json({
        status: "success",
        message: "Patient registered succesfully",
        results: newPatient.length,
        data: {
            newPatient,
        }
    })
})


