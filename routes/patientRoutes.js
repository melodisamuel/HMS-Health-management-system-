// const { router } = require('../app')
const express = require('express');
const patientController = require('../controllers/patientController');
const authController = require('../controllers/authController');

const router = express.Router()

router.route('/register-patient').post(authController.protect, patientController.registerPatient);
router.route('/book-appointment').post(authController.protect, patientController.bookAppointment);

router.route('/view-prescription/:id').get(authController.protect, patientController.viewPrescription);
router.route('/view-doctors-list').get(authController.protect, patientController.viewDoctorsList);
router.route('/view-results-reports/:id').get(authController.protect, patientController.viewReportsAndResults);
router.route('/manage-profile/:id').patch(authController.protect, patientController.manageProfile);


module.exports = router;
