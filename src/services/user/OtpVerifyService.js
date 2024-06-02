const OtpVerifyService = async (request, DataModel)=>{

    try{
        let email = request.params.email
        let otp = request.params.otp
        let otpStatus = 0
        let updateOtpStatus = 1

        let otpCheck = await DataModel.aggregate(
            [
                {$match: {  email: email, otp: otp, status: otpStatus }},
                {$count: "total"}
            ]
        )



        if(otpCheck.length > 0){
            let updateOtp = await DataModel.updateOne({email: email, otp:otp, status : otpStatus}, {email: email, otp:otp, status : updateOtpStatus})
            return {status:"success", data: updateOtp}
        }

        else{
            return {status:"fail", data: "Invalid OTP"}
        }

    }
    catch(error){
        return {status:"fail", data: error}
    }
}

module.exports = OtpVerifyService