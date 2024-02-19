const crypto = require('crypto');
const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const Registration = require('../models/registration');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const createSendToken = (registration, statusCode, res) => {
    const token = signToken(registration._id);
  
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  
    res.cookie("jwt", token, cookieOptions);
  
    // Remove password from the output
    registration.password = undefined;
  
    res.status(statusCode).json({
      status: "success",
      token,
      data: {
        registration,
      },
    });
  };


exports.loginStaff = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    
    // Check if email and password exists
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400))
    }

    // Check if staff exists && password is correct
    const registration = await Registration.findOne({ email }).select('+password');


    if (!registration || !await registration.correctPassword(password, registration.password)) {
        return next(new AppError('Incorrect email or password!', 401))
    }
 
 // 3. if everything ok send token to client
 createSendToken(registration, 200, res);
});
