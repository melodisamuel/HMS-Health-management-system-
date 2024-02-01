const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/register').post(authController.signUp);
router.route('/login').post(authController.login);  

router.route('/forgotPassword').post(authController.forgotPassword);  
router.route('/resetPassword/:token').patch(authController.resetPassword);  
router.route('/updatePassword/').patch(authController.protect, authController.restrictTo, authController.updatePassword);  

router.route('/updateMe/').patch(authController.protect, userController.updateMe);  
router.route('/deleteMe/').delete(authController.protect, userController.deleteMe);  

module.exports = router;