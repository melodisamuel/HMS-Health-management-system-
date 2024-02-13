const Appointment = require('../models/appointment');
const catchAsync = require('../utils/catchAsync');
const Registration = require('../models/registration');
const Patient = require('../models/patient');
const AppError = require('../utils/appError');


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
});

exports.updatePatient = catchAsync(async (req, res) => {
    const { user, medicalHistory, appointments, prescriptions, reports, feedback } = req.body;

    
        const updatedPatient = await Patient.findOneAndUpdate(
            { user: req.params.userId }, // Assuming userId is passed in the request parameters
            {
                user,
                medicalHistory,
                appointments,
                prescriptions,
                reports,
                feedback
            },
            { new: true }
        );

        if (!updatedPatient) {
            return next(new AppError("Patient not found", 404));
        }

        res.status(200).json({
            status: 'success',
            message: 'Patient updated successfully',
            data: {
                patient: updatedPatient,
            },
        });
  
});


exports.manageProfile = catchAsync(async (req, res, next) => {
    const receptionist = await Registration.findOneAndUpdate(
        { role: "receptionist" },
        { $set: req.body },
        { new: true }
    );

    if (!receptionist) {
        return next(new AppError("Receptionist not found!", 500))
    }

    res.status(200).json({
        status: "success",
        data: {
            receptionist
        }
    })
})