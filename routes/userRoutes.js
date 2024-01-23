const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/register').post(authController.protect, authController.register);
router.route('/login').post(authController.login);  

module.exports = router;