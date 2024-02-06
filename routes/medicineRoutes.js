const express = require('express');
const medicineController = require('../controllers/medicineController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/medicine-status')
    .post(authController.protect, medicineController.medicineStatus);

router.route('/update-medicine-status/:id')
    .patch(authController.protect, authController.restrictTo('admin'), medicineController.updateMedicineStatus)

router.route('/check-all-medicine-status').get(authController.protect, authController.restrictTo('admin'), medicineController.checkAllMedicineStatus)

module.exports = router;
