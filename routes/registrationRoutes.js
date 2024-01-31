const express = require('express');
// const doctorController = require('../controllers/doctorController')
const authController = require('../controllers/authController')

const router = express.Router()

router.route('/').post(authController.protect, authController.restrictTo('admin'), authController.register);

module.exports = router;