// const Admin = require('../models/admin');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Registration = require('../models/registration')
const AllocateResources = require('../models/resourceAllocation')
const Medicine = require('../models/medicine');
const Report = require('../models/reportAndResults')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const { promisify } = require('util')



exports.manageStaffAccounts = catchAsync(async (req, res, next) => {
    const staffMembers = await Registration.find();

    res.status(200).json({
        status: 'success',
        results: staffMembers.length,
        data: {
            staffMembers
        }
    })
}) 

exports.allocateResources =catchAsync(async (req, res, next) => {
    const newAllocation = await AllocateResources.create(req.body);
    
    res.status(201).json({
        status: "success",
        message: "Resources allocated successfully",
        data: {
            newAllocation
        }
    })
})

exports.observeMedicineStatus = catchAsync(async (req, res, next) => {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
        return next(new AppError("No medicine found with that ID", 404))
    }

    res.status(200).json({
        status: "success",
        data: {
            medicine
        }
    })
})


