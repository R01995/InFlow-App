const nodemailer = require("nodemailer");

const SendEmailUtility = async (emailTo , emailSubject, emailText) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "rahulbiswas007711@gmail.com",
            pass: "javf ljwt zabw jmai",
        },
    })

    let mailoptions = {
        from: '"InFlow-App"<rahulbiswas007711@gmail.com>',
        to: emailTo,
        subject: emailSubject,
        text:  emailText   
    }
    return await transporter.sendMail(mailoptions)

}

module.exports = SendEmailUtility