const Medicine = require('../models/medicine');
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.medicineStatus = catchAsync(async (req, res, next) => {
    const medicine = await Medicine.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            medicine
        }
    })
})