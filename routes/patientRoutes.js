// const { router } = require('../app')
const express = require('express');
const patientController = require('../controllers/patientController');
const authController = require('../controllers/authController');

const router = express.Router()

router.route('/register-patient').post(authController.protect, patientController.registerPatient);
router.route('/book-appointment').post(authController.protect, patientController.bookAppointment);

module.exports = router;
