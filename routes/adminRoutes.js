const express = require("express");
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController')

const router = express.Router();

router.route('/manage-staff-accounts')
    .get(authController.protect, authController.restrictTo('admin'), adminController.manageStaffAccounts);


module.exports = router;