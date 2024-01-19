const Patient = require('../models/patient')
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.patientController = {
    // Book an appoiment
    bookAppointment: catchAsync(async (req, res, next) => {
        const newAppointment = await Appointment.create(req.body);
        res.staus(201).json({
            status: 'success',
            message: 'Appointment booked succesfully',
            appointment: newAppointment,
        })
    })
}
