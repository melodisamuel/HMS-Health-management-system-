const express = require('express');
// const doctorController = require('../controllers/doctorController')
const authController = require('../controllers/authController')
const adminController = require('../controllers/adminController')

const router = express.Router()

router.route('/').post(authController.protect, authController.restrictTo('admin'), adminController.register);

module.exports = router;