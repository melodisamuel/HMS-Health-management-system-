const express = require('express');
const medicineController = require('../controllers/medicineController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/medicine-status').post(authController.protect, medicineController.medicineStatus);

module.exports = router;
