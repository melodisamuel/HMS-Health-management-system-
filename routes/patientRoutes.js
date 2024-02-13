// const { router } = require('../app')
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router()

router.route('/book-appointment').post(authController.protect, patientController.bookAppointment);

router.route('/view-prescription/:id').get(authController.protect, patientController.viewPrescription);
router.route('/view-doctors-list').get(authController.protect, patientController.viewDoctorsList);
router.route('/view-results-reports/:id').get(authController.protect, patientController.viewReportsAndResults);
router.route('/manage-profile/:id').patch(authController.protect, patientController.manageProfile);


module.exports = router;
