// const Admin = require('../models/admin');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Registration = require('../models/registration')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const { promisify } = require('util')

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

// const
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
  
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  
    res.cookie("jwt", token, cookieOptions);

    // Remove password from the output
    user.password = undefined;
  
    res.status(statusCode).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  };



exports.register = catchAsync(async (req, res, next) => {
    // const filteredBody = filteredObj(req.body, fullName, username, email, gender, phoneNumber, dateOfBirth, password, passwordConfirm)
    const newStaff = await Registration.create(req.body);
    // if (!patient) {
    //     return next(new AppError("No patient found with that ID", 404))
    // }
    createSendToken(newStaff, 201, res);

});

exports.manageStaffAccounts = catchAsync(async (req, res, next) => {
    const staffMembers = await Registration.find();

    res.status(200).json({
        status: 'success',
        results: staffMembers.length,
        data: {
            staffMembers
        }
    })
}) 
