const express = require('express');
const doctorController = require('../controllers/doctorController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/enter-prescription').post(authController.protect, doctorController.enterPresciption);

module.exports = router;
