const validator = require('validator')
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "fullName is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a valid email address"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email address"]
    },
    userName: {
        type: String,
        required: [true, 'userName is required'],
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
        enum: ["admin", "patient", "receptionist", "doctor", "nurse", "pharmacist"],
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
})

userSchema.pre('save', async function (next) {
    // RUn this function only if password was modified
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12)

    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.correctPassword = function (candidatePassword, userPassword) { 
    return bcrypt.compare(candidatePassword, userPassword);

}

const User = mongoose.model("User", userSchema);

module.exports = User;
