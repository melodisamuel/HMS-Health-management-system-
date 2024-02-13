const Appointment = require('../models/appointment');
const catchAsync = require('../utils/catchAsync');
const Registration = require('../models/registration');

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