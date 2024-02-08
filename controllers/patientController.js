const Patient = require('../models/patient')
const Prescription = require('../models/prescription');
const Registration = require('../models/registration');
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

exports.viewPrescription = catchAsync(async (req, res, next) => {
    const presciption = await Prescription.findById(req.params.id);

    if (!Prescription) {
        return next(new AppError('No prescription found with that ID', 404))
    }

    res.status(200).json({
        status: "success",
        data: {
            presciption
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
    })
    })