const express = require('express');
const staffController = require('../controllers/staffController');

const router = express.Router();


router.route('/login-staff').post(staffController.loginStaff);  

module.exports = router;
