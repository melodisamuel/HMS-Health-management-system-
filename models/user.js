const crypto = require('crypto');
const validator = require('validator')
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "fullName is required"],
        // unique: true,
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
        required: [true, 'UserName is required'],
        unique: true,
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
    },
    phoneNumber: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{3}-\d{3}-\d{4}/.test(v)
            },
            message: (props) => `${props.value} is not a valid phone number!`
        },
        required: [true, 'Phone number is required']
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin", "patient", "receptionist", "doctor", "nurse", "pharmacist"],
        default: 'user',
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
    passwordChangedAt: Date,
    PasswordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false,
      },
})

userSchema.pre('save', async function (next) {
    // RUn this function only if password was modified
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12)

    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.correctPassword =async function (candidatePassword, userPassword) { 
    return await bcrypt.compare(candidatePassword, userPassword);

}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);


        return JWTTimestamp < changedTimestamp;
    }


    return false;
}

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
  
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    console.log({ resetToken }, this.passwordResetToken);
  
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };

const User = mongoose.model("User", userSchema);

module.exports = User;
