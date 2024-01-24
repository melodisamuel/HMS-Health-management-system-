// const { router } = require('../app')
const express = require('express');
const patientController = require('../controllers/patientController')

const router = express.Router()

router.route('/').post(patientController.bookAppointment);

module.exports = router;
