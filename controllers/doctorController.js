const Prescription = require('../models/prescription');
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

// exports.generateReport = catchAsync(async (req, res, next) => {
//     const newReport = await Doctor.create(req.body);

//     res.status(201).json({
//         status: 'success',
//         data: {
//             doctor: newReport,
//         }
//     })
// })