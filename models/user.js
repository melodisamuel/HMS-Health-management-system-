const validator = require('validator')
const  mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a valid email address"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email address"]
    },
    role: {
        type: String,
        enum: ["admin", "patient", "receptionist", "doctor", "nurse", "pharmacist"],
        required: true,
    }
})

const User = mongoose.model("user", userSchema);

module.exports = User;
