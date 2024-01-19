const jwt = require('jsonwebtoken')
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');


exports.register = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        fullName: req.body.fullName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        phoneNumber: req.body.phoneNumber
    })
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
    
    res.status(201).json({
        status: "success",
        token,
        data: {
            user: newUser
        }
    })
 })