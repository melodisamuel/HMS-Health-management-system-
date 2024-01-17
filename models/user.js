const validator = require('validator')
const  mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a valid email address"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email address"]
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
        required: true,
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;
