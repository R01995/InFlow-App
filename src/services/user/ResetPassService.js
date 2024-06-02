

const bcrypt = require("bcrypt");
const OtpModel = require("../../models/User/OtpModel");

const ResetPassService = async (Reqest, DataModel) => {
  try {
    let email = Reqest.body.email;
    let otp = Reqest.body.otp;
    let updateStatus = 1;
    let newPass = Reqest.body.password;

    // Hah The new password
    const hashedPassword = await bcrypt.hash(newPass, 10);

    let otpVerifyCheck = await OtpModel.aggregate([
      { $match: { email: email, otp: otp, status: updateStatus } },
      { $count: "total" },
    ]);

    if (otpVerifyCheck.length > 0) {
      let passwordUpdate = await DataModel.updateOne(
        { email: email },
        { email: email, password: hashedPassword }
      );
      return { status: "success", data: passwordUpdate };
    } 
    
    else {
      return { status: "fail", data: "Invalid OTP" };
    }
  } 
  
  catch (error) {
    return { status: "fail", data: error };
  }
};

module.exports = ResetPassService;