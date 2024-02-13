const Appointment = require('../models/appointment');
const catchAsync = require('../utils/catchAsync');

exports.viewAppointmentList = catchAsync(async (req, res, next) => {
    const appointment = await Appointment.find()

    res.status(200).json({
        status: 'success',
        data: {
            appointment
        }
    })
})