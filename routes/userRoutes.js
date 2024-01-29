const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);  

router.route('/forgotPassword').post(authController.forgotPassword);  
router.route('/resetPassword/:token').patch(authController.resetPassword);  
router.route('/updatePassword/').patch(authController.protect, authController.updatePassword);  

module.exports = router;