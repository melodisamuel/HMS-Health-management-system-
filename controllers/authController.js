const jwt = require('jsonwebtoken')
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

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
    const token = signToken(newUser.id);
    
    res.status(201).json({
        status: "success",
        token,
        data: {
            user: newUser
        }
    })
});
 
exports.login =  catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    
    // Check if email and password exists
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400))
    }

    // Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');


    if (!user || !await user.correctPassword(password, user.password)) {
        return next(new AppError('Incorrect email or password!', 401))
    }
 
    // if everything ok, send token 
    const token = signToken(user._id);
        res.status(200).json({
            status: 'success',
            token,
    })

});