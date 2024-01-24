const express = require('express');
const doctorController = require('../controllers/doctorController')

const router = express.Router()

router.route('/').post(doctorController.registerDoctor);

module.exports = router;