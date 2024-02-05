const express = require("express");
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController')


const router = express.Router();

router.route('/manage-staff-accounts')
    .get(authController.protect, authController.restrictTo('admin'), adminController.manageStaffAccounts);

router.route('/allocate-resources')
    .post(authController.protect, authController.restrictTo('admin'), adminController.allocateResources)


module.exports = router;