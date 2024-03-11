const express = require('express');
const authController = require('../controllers/authController');
const pharmacistController = require('../controllers/pharmacistController');

const router = express.Router();

router.route('/watch-patient-prescription').get(authController.protect, authController.restrictTo('admin', 'pharmacist'), pharmacistController.watchPatientPrescription);

module.exports = router;