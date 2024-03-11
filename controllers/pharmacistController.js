const Prescription = require('../models/prescription');
const MedicationDispense = require('../models/medication');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.watchPatientPrescription = catchAsync(async (req, res, next) => {
    // Extract patientId from the request query parameters
    const { patientId } = req.query;

    // Fetch prescriptions for the specified patientId
    const prescriptions = await Prescription.find({ patientId });
    // Check if prescriptions were found
    if (!prescriptions) {
        return next(new AppError('Prescription not found for specified patient', 404));
    }

    // If prescriptions are found, send them in the response
    res.status(200).json({
        status: "success",
        data: {
            prescriptions,
        }
    });

});

exports.DispenseMedication = catchAsync(async (req, res, next) => {
    const medication = await MedicationDispense.create(req.body);

    res.status(201).json({
        status: "success",
        message: 'Medication dispensed successfully',
        data: {
            medication
        }
    })
})