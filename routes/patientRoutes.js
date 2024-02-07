// const { router } = require('../app')
const express = require('express');
const patientController = require('../controllers/patientController');
const authController = require('../controllers/authController');

const router = express.Router()

router.route('/register-patient').post(authController.protect, patientController.registerPatient);

module.exports = router;
