const UserModel = require("../models/User/UsersModels")
const UserCreateServices = require("../services/user/UserCreateServices")
const UserLoginServices = require("../services/user/UserLoginServices")
const UserDetailsService = require("../services/user/UserDetailsService")
const UserEmailVerifyService = require("../services/user/UserEmailVerifyService")
const OtpVerifyService = require("../services/user/OtpVerifyService")
const OtpModel = require("../models/User/OtpModel")
const ResetPassService = require("../services/user/ResetPassService")
const UserUpdateService = require("../services/user/UserUpdateService")

exports.Registration = async (req, res) => {
    const result = await UserCreateServices(req, UserModel)
    res.status(200).json(result)
}

//Login Controllar
exports.Login = async (req, res) => {
    const result = await UserLoginServices(req, UserModel)
    res.status(200).json(result)
}
//User details 3 before cerate midelewer
exports.profileDetails = async (req, res) => {
    const result = await UserDetailsService(req, UserModel)
    res.status(200).json(result)
}

exports.EmailVerify = async (req, res) => {
    const result = await UserEmailVerifyService(req, UserModel)
    res.status(200).json(result)
}

exports.OtpVerify = async (req, res) => {
    const result = await OtpVerifyService(req, OtpModel)
    res.status(200).json(result)
}

exports.ResetPassword = async (req, res) => {
    const result = await ResetPassService(req, UserModel)
    res.status(200).json(result)
}

exports.UpdateUser = async (req, res) => {
    const result = await UserUpdateService(req, UserModel)
    res.status(200).json(result)
}