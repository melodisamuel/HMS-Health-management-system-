const express = require('express');
const receptionistController = require('../controllers/receptionistController');
const authController = require('../controllers/authController');
const patientController = require('../controllers/patientController');
const staffController = require('../controllers/staffController')


const router = express.Router()

router.route('/view-appointment-list').get(authController.protect, receptionistController.viewAppointmentList);
router.route('/view-nurses-schedule').get(authController.protect, receptionistController.viewNursesSchedule);

router.route('/book-appointment').post(authController.protect, patientController.bookAppointment);
router.route('/register-patient').post(authController.protect, receptionistController.registerPatient);
router.route('/issue-clinic-number').post(authController.protect, receptionistController.issueClinicNumber);

router.route('/update-patient/:userId').patch(staffController.protect, staffController.restrictTo('admin', 'recptionist', 'doctor'), receptionistController.updatePatient);
router.route('/manage-profile/').patch(authController.protect, receptionistController.manageProfile);



module.exports = router;