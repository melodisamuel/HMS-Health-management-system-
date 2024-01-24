const Patient = require('../models/patient')
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.bookAppointment = catchAsync(async (req, res, next) => {
    // Book an appoiment
    const newAppointment = await Patient.create(req.body)
    
        res.staus(201).json({
            status: 'success',
            message: 'Appointment booked succesfully',
            appointment: newAppointment,
        })
    })

