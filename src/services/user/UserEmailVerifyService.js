const OtpModel = require("../../models/User/OtpModel")
const EmailUtility = require("../../utility/SendEmail")

const UserEmailVerifyService = async (Request, DataModel)=>{
  
    try{

        let email = Request.params.email
        let otp = Math.floor(100000 + Math.random() * 900000) // random 6 digit number

        let userCheck = await DataModel.aggregate (
            [
                {$match: {  email: email  }},
                {$count: "total"}
            ]
        )

        if(userCheck.length > 0){
            await OtpModel.create({email: email, otp: otp}) // create OTP in DB

            let sendEmail = await EmailUtility(email, "InFlow-App Password Verification", `Your OTP is ${otp}`)

            return {status:"success", data: "OTP Sent Successfully"}
        }

        else{
            return {status:"fail", data: "User Not Found"}
        }


    }

    catch(error){
        return {status:"fail", data: error}
    }

}

module.exports = UserEmailVerifyService