const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Examination = require('../models/examinationResults');
const LabAssistantSpecimen = require('../models/processSpecimen');
const Registration = require('../models/registration');


exports.ProcessResult = catchAsync(async (req, res, next) => {
    const examination = await Examination.create(req.body);

    res.status(201).json({
        status: "success",
        message: "examination results created successfuly",
        results: examination.length,
        data: {
            examination
        }
    })
});

exports.processSpecimen = catchAsync(async (req, res, next) => {
    const specimen = await LabAssistantSpecimen.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            specimen,
        }
    })
})


exports.manageProfile = catchAsync(async (req, res, next) => {
    const { id } = req.params; // Correctly extract the id from req.params

    // Find and update the profile of the specific doctor using the id
    const profile = await Registration.findOneAndUpdate({ _id: id, role: 'lab assistant' }, req.body, {
        new: true, // Return the updated document
        runValidators: true // Run validation checks on the update operation
    });

    // Check if the profile was found and updated
    if (!profile) {
        return next(new AppError('There is no lab assistant with that profile', 404));
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

