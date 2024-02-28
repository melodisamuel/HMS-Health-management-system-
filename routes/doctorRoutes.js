const express = require('express');
const doctorController = require('../controllers/doctorController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/view-schedule/:id').get(authController.protect, authController.restrictTo('admin', 'doctor', 'nurse'), doctorController.viewSchedule);
router.route('/view-nurses-schedule/:id').get(authController.protect, authController.restrictTo('admin', 'doctor', 'nurse'), doctorController.viewNursesSchedule);
router.route('/view-labAssistant-schedule/:id').get(authController.protect, authController.restrictTo('admin', 'doctor', 'lab assistant'), doctorController.viewLabAssistantSchedule);

router.route('/enter-prescription').post(authController.protect, doctorController.enterPresciption);
router.route('/generate-reports-results').post(authController.protect, doctorController.generateResultsAndReports);
router.route('/diagnose-patient').post(authController.protect, authController.restrictTo('admin', 'doctor'), doctorController.diagnosePatient);
router.route('/recommend-examination').post(authController.protect, authController.restrictTo('admin', 'doctor'), doctorController.recommendExamination);
router.route('/track-examination-results/:patientId/examinations/:examinationId').get(authController.protect, authController.restrictTo('admin', 'doctor'), doctorController.recommendExamination);

module.exports = router;
