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

exports.updateMedicineStatus = catchAsync(async (req, res, next) => {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true }) 

    if (!medicine) {
        return next(new AppError('No medicine found with that ID', 404))
    }

        res.status(200).json({
            status: "success",
            data: {
                medicine
            }
        })
})
    
exports.checkAllMedicineStatus = catchAsync(async (req, res, next) => {
    const medicine = await Medicine.find()

    res.status(200).json({
        status: "success",
        results: medicine.length,
        data: {
            medicine,
        }
    })
})

exports.deleteMedcineStatus = catchAsync(async (req, res, next) => {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);

    if (!medicine) {
        return next(new AppError('No medicine found with that ID', 404))
    }

    res.status(204).json({
        status: "success",
        data: null
    })

})
