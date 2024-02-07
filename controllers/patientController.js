const Patient = require('../models/patient')
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Appointment = require('../models/appointment');

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

