const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const validator = require('validator')


const registrationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String, 
        required: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a valid email address"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email address"]
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 8,
        select: false,
        select: false,
      },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
          validator: function (el) {
            return el  === this.password
          },
          message: 'Passwords are not the same'
        }
    },
     email: {
        type: String,
        required: [true, "Please provide a valid email address"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email address"]
    },
    phoneNumber: {
        type: String,
        unique: true,
    },
    speciality: {
        type: String,
        required: true,
    },
    schedule: [{
        day: String,
        startTime: String,
        endTime: String,
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: String,
        enum: ["admin", "patient", "receptionist", "doctor", "nurse", "pharmacist", "Lab Assistant"],
        default: 'admin',
        required: [true, 'Role is required to register new staff']
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }});

registrationSchema.pre('save', async function (next) {
    // RUn this function only if password was modified
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12)

    this.passwordConfirm = undefined;
    next();
});


registrationSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next()
    
    this.passwordChangedAt = Date.now() - 1000;
    next();
})

registrationSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false} });

    next();
})

registrationSchema.methods.correctPassword =async function (candidatePassword, registrationPassword) { 
    return await bcrypt.compare(candidatePassword, registrationPassword);

}

registrationSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10  
      );
  
      return JWTTimestamp < changedTimestamp;
    }
    return false;
};
registrationSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
  
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    // console.log({ resetToken }, this.passwordResetToken);
  
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };
  


const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;