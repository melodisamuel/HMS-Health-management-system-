const crypto = require('crypto');
const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');


const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

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

exports.signUp = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        fullName: req.body.fullName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        passwordChangedAt: req.body.passwordChangedAt,
        passwordResetToken: req.body.passwordResetToken,
        role: req.body.role,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        phoneNumber: req.body.phoneNumber
    })
    createSendToken(newUser, 201, res);
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
 
 // 3. if everything ok send token to client
 createSendToken(user, 200, res);
});



// filteredObj = (obj, ...allowedFields) => {
//     const newObj = {};
//     Object.keys(obj).forEach(el => {
//         if (allowedFields.includes(el)) newObj[el] = obj[el];
//     })
//     return newObj
// }



exports.protect = catchAsync(async (req, res, next) => {
    // Get token and check if its there 
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return next(new AppError('You are not logged in! please login to get access.', 401))
    }

    // Verify token 
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    // Check if user still exists
    const freshUser = await User.findById(decoded.id)
    if (!freshUser) {
        next(new AppError('The user belonging to the token  longer exists.', 401))
    }

    // Check if user chnaged password after the token was issued 
    if (freshUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('User recently changed passsword! Please login again.', 401))
    }
    // Allow access to protected route
    req.user = freshUser;
    next()
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles ['admin']
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403))
        }
        next();
    }
}


exports.forgotPassword = catchAsync(async (req, res, next) => {
    // 1. Get user based on posted email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new AppError("There is no user with that email address", 404));
    }
  
    // 2. Generate the random token
    const resetToken = user.createPasswordResetToken();

    await user.save({ validateBeforeSave: false });
  
    // 3. Send it back as an email
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;
  
    const message = `Forgot your password? submit a patch request with your new password and 
    passwordConfrim to: ${resetUrl}.\nif you didnt forget your password forget this email!`;
  
    try {
      await sendEmail({
        email: user.email,
        subject: "Your password reset token (valid 10 mins)",
        message,
      });
  
      res.status(200).json({
        status: "success",
        message: "Token sent to your email",
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
  
      return next(
        new AppError("There was an error sending the email. Try again later"),
        500
      );
    }
  });
  

      exports.resetPassword = catchAsync(async (req, res, next) => {
        // 1 . Get user based on the token
        const hashedToken = crypto
          .createHash("sha256")
          .update(req.params.token)
          .digest("hex");

        const user = await User.findOne({
          passwordResetToken: hashedToken,
          passwordResetExpires: { $gt: Date.now() },
        });

        // 2. If token has not expired, and there is user, set the new password
        if (!user) {
          return next(new AppError("Token is invalid or has expired.", 400));
        }
        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        // 3. Update changedPasswordAt property for the user
          
         // 4. log the user in send, jwt to the client
        createSendToken(user, 200, res);
      });

exports.updatePassword = catchAsync(async(req, res, next) => {
    // Get user from collection 
    const user = await User.findById(req.user.id).select("+password");

    // Check if posted password is correct
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next(new AppError("Your current password is wrong", 401))
    }

    // if so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save()

    // Log user in, send JWT back to the user
    createSendToken(user, 200, res);
    next()
      })

      