const Appointment = require('../models/appointment');
const catchAsync = require('../utils/catchAsync');
const Registration = require('../models/registration');
const Patient = require('../models/patient')


exports.viewAppointmentList = catchAsync(async (req, res, next) => {
    const appointment = await Appointment.find()

    res.status(200).json({
        status: 'success',
        data: {
            appointment
        }
    })
});

exports.viewNursesSchedule = catchAsync(async (req, res, next) => {
    const nurses = await Registration.find({ role: "nurse" })

    res.status(200).json({
        status: "success",
        data: {
            nurses
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
});

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
    
