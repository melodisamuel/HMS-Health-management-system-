const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);  

router.route('/forgotPassword').post(authController.forgotPassword);  
router.route('/resetPassword/:token').post(authController.resetPassword);  

module.exports = router;