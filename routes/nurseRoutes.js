const express = require('express');
const authController = require('../controllers/authController');
const nurseController = require('../controllers/nurseController');

const router = express.Router();

router.route('/patient-preAssessment').post(authController.protect, authController.restrictTo('admin', 'nurse'), nurseController.patientPreAssessment);
router.route('/assign-doctor').post(authController.protect, authController.restrictTo('admin', 'nurse'), nurseController.assignDoctor);


module.exports = router