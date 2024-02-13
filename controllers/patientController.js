const Prescription = require('../models/prescription');
const Registration = require('../models/registration');
const ResultsAndReports = require('../models/reportAndResults');
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Appointment = require('../models/appointment');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    })
    return newObj
}



exports.bookAppointment = catchAsync(async (req, res, next) => {
    // Book an appoiment
    const newAppointment = await Appointment.create(req.body)
    
        res.status(201).json({
            status: 'success',
            message: 'Appointment booked succesfully',
            results: newAppointment.length,
            data: {
                newAppointment
            }
            
        })
    })

exports.viewPrescription = catchAsync(async (req, res, next) => {
    const prescription = await Prescription.findById(req.params.id);

    if (!Prescription) {
        return next(new AppError('No prescription found with that ID', 404))
    }

    res.status(200).json({
        status: "success",
        data: {
            prescription
        }
    })
    })

exports.viewDoctorsList = catchAsync(async (req, res, next) => {
    const doctors = await Registration.find({ role: "doctor" });

    // if (!doctors) {
    //     return next(new AppError('Doctor list is empty'));
    // }

    res.status(200).json({
        status: 'success',
        data: {
            doctors,
        }
    });
});

exports.viewReportsAndResults = catchAsync(async (req, res, next) => {
    const resultsAndReports = await ResultsAndReports.findById(req.params.id)

    if (!ResultsAndReports) {
        return next(new AppError('No result/report found with that ID', 404))
    }

    res.status(200).json({
        status: "success",
        data: {
            resultsAndReports
        }
    })
    
})



exports.manageProfile = catchAsync(async (req, res, next) => {
    // Create an error if user posts password data
    // if (req.body.password || req.body.passwordConfirm) {
    //     return next (new AppError('This route is not for password updates. Please use /updateMyPassword.', 400))
    // }
    // Filtered out unwanted filled names 
    const filteredBody = filterObj(req.body, 'fullName', 'username', 'gender', 'phoneNumber', 'dateOfBirth');

    // Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, { new: true, runValidators: true})
    res.status(200).json({
        status: "success",
        data: {
            user: updatedUser
        }
    })
})

    