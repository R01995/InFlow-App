const mongoose = require("mongoose");

// OTP Schema 4 **

const otpSchema = new mongoose.Schema({
    email: {type: String,},
    otp: {type: String},
    status : {type: Number, default: 0},
    createdDate : {type: Date, default: Date.now()}
}, { versionKey: false });

const OtpModel = mongoose.model("otps", otpSchema);

module.exports = OtpModel