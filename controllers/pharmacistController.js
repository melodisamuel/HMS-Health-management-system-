const Prescription = require('../models/pharmacist');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.watchPatientPrescription = catchAsync(async (req, res, next) => {

    const { patientId } = req.query;

    const patient = await Prescription.find({ patientId });

    // Check if examinaitons was found
    if (!patient) {
        return next(new AppError('Prescription not found for specified patient', 404));
    }

    // If examinaitons are found, send them in the response
    res.status(200).json({
        status: "success",
        data: {
            patient,
        }
    })
})