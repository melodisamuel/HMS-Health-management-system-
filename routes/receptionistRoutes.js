const express = require('express');
const receptionistController = require('../controllers/receptionistController');
const authController = require('../controllers/authController');

const router = express.Router()

router.route('/view-appointment-list').get(authController.protect, receptionistController.viewAppointmentList);

module.exports = router;