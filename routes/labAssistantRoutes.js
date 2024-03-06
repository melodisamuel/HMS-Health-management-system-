const express = require('express');
const labAssistantController = require('../controllers/labAssistantController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/process-examination').post(authController.protect, authController.restrictTo('admin', 'lab assistant'), labAssistantController.ProcessResult);
router.route('/process-specimen').post(authController.protect, authController.restrictTo('admin', 'lab assistant'), labAssistantController.processSpecimen);
router.route('/manage-profile').put(authController.protect, authController.restrictTo('admin', 'lab assistant'), labAssistantController.manageProfile);


module.exports = router;