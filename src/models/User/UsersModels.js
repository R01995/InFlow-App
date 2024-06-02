const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
 
    createDate: {
        type: Date,
        default: Date.now
    },

    },
    {
        versionKey: false
    }
)

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel