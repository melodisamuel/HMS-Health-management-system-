const express = require('express');
const doctorController = require('../controllers/doctorController');
const authController = require('../controllers/authController');

const router = express.Router();


router.route('/enter-prescription').post(authController.protect, doctorController.enterPresciption);
router.route('/generate-reports-results').post(authController.protect, doctorController.generateResultsAndReports);
router.route('/diagnose-patient').post(authController.protect, authController.restrictTo('admin', 'doctor'), doctorController.diagnosePatient);

module.exports = router;
