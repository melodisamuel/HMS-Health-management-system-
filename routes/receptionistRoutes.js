const express = require('express');
const receptionistController = require('../controllers/receptionistController');
const authController = require('../controllers/authController');
const patientController = require('../controllers/patientController');


const router = express.Router()

router.route('/view-appointment-list').get(authController.protect, receptionistController.viewAppointmentList);
router.route('/view-nurses-schedule').get(authController.protect, receptionistController.viewNursesSchedule);

router.route('/book-appointment').post(authController.protect, patientController.bookAppointment);
router.route('/register-patient').post(authController.protect, patientController.registerPatient);



module.exports = router;