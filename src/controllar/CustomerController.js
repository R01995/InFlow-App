const CustomerModel = require("../models/Customer/CustomerModel")
const CreateService = require("../services/common/CreateService")
const DetailsServiceById = require("../services/common/DetailsServiceById")
const DropDownService = require("../services/common/DropDownService")
const ListService = require("../services/common/ListService")
const UpdateService = require("../services/common/UpdateService")

exports.CreateCustomer = async (req, res) => {
    let result = await CreateService (req, CustomerModel)
    res.status(200).json(result)
}

exports.CustomerDetailsById = async (req, res) => {
    let result = await DetailsServiceById (req, CustomerModel)
    res.status(200).json(result)
}

exports.CustomerUpdate = async (req, res) => {
    let result = await UpdateService (req, CustomerModel)
    res.status(200).json(result)
}

exports.CustomerDropdown = async (req, res) => {
    let result = await DropDownService (req, CustomerModel, {_id: 1, customerName: 1})
    res.status(200).json(result)
}

exports.CustomerList = async (req, res) => {
    let searchRegex = {"$regex": req.params.searchText, "$options": "i"};
    let array = [{customerName: searchRegex},{email: searchRegex},{address: searchRegex},{phone: searchRegex}];
    let result = await ListService(req, CustomerModel,array);
    res.status(200).json(result);
}