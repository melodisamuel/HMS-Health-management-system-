const PreAssessment = require('../models/preAssessment');
const NurseAssignment = require('../models/assignDoctor');
const SpecimenCollection = require('../models/specimen');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.patientPreAssessment = catchAsync(async (req, res, next) => {
    const patient = await PreAssessment.create(req.body);

    res.status(201).json({
        status: 'success',
        message: 'Patient has been PreAssessed',
        results: patient.length,
        data: {
            patient
        }
    })
});

exports.assignDoctor = catchAsync(async (req, res, next) => {
    const doctor = await NurseAssignment.create(req.body);

    res.status(201).json({
        status: 'success',
        message: 'Doctor has been assigned',
        results: doctor.length,
        data: {
            doctor
        }
    })
});

exports.collectSpecimen = catchAsync(async (req, res, next) => {
    const specimen = await SpecimenCollection.create(req.body);

    res.status(201).json({
        status: 'success',
        message: 'Specimen has been collected',
        results: specimen.length,
        data: {
            specimen
        }
    })
})


exports.manageProfile = catchAsync(async (req, res, next) => {
    const { id } = req.params; // Correctly extract the id from req.params

    // Find and update the profile of the specific doctor using the id
    const profile = await Registration.findOneAndUpdate({ _id: id, role: 'nurse' }, req.body, {
        new: true, // Return the updated document
        runValidators: true // Run validation checks on the update operation
    });

    // Check if the profile was found and updated
    if (!profile) {
        return next(new AppError('There is no nurse with that profile', 404));
    }

    // Send the updated profile in the response
    res.status(200).json({
        status: "success",
        message: "Profile updated successfully",
        data: {
            profile,
        }
    });
});

