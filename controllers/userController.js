// const User = require('../models/user');
// const catchAsync = require('../utils/catchAsync');


// exports.register = catchAsync(async (req, res, next) => {
//     const newUser = await User.create({
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//         passwordConfirm: req.body.passwordConfirm,
//         dateOfBirth: req.body.dateOfBirth,
//         gender: req.body.gender,
//         phoneNumber: req.body.phoneNumber,
//         role: req.body.role
//     })
//     res.status(201).json({
//         status: "success",
//         data: {
//             user: newUser
//         }
//     })
//  })