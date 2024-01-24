const Doctor = require('../models/doctor');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.registerDoctor = catchAsync(async (req, res, next) => {
    const newDoctor = await Doctor.create(req.body);
    // if (!patient) {
    //     return next(new AppError("No patient found with that ID", 404))
    // }
    res.status(201).json({
        status: 'success',
        data: {
            newDoctor,
        }
    })

});

// exports.generateReport = catchAsync(async (req, res, next) => {
//     const newReport = await Doctor.create(req.body);

//     res.status(201).json({
//         status: 'success',
//         data: {
//             doctor: newReport,
//         }
//     })
// })