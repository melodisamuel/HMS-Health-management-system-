const express = require('express');
const authController = require('../controllers/authController');
const nurseController = require('../controllers/nurseController');

const router = express.Router();

router.route('/patient-preAssessment').post(authController.protect, authController.restrictTo('admin', 'nurse'), nurseController.patientPreAssessment)


module.exports = router