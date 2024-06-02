const SuppliersModel = require("../models/Suppliers/SuppliersModel")
const CreateService = require("../services/common/CreateService")
const DetailsServiceById = require("../services/common/DetailsServiceById")
const DropDownService = require("../services/common/DropDownService")
const ListService = require("../services/common/ListService")
const UpdateService = require("../services/common/UpdateService")

exports.CreateSupplier = async (req, res) => {
    let result = await CreateService (req, SuppliersModel)
    res.status(200).json(result)
}

exports.SupplierDetailsById = async (req, res) => {
    let result = await DetailsServiceById (req, SuppliersModel)
    res.status(200).json(result)
}

exports.SupplierUpdate = async (req, res) => {
    let result = await UpdateService (req, SuppliersModel)
    res.status(200).json(result)
}

exports.SupplierDropdown = async (req, res) => {
    let result = await DropDownService (req, SuppliersModel, {_id: 1, supplierName: 1})
    res.status(200).json(result)
}


exports.SupplierList = async (req, res) => {
    let searchRegex = {"$regex": req.params.searchText, "$options": "i"};
    let array = [{supplierName: searchRegex},{email: searchRegex},{address: searchRegex},{phone: searchRegex}];
    let result = await ListService(req, SuppliersModel,array);
    res.status(200).json(result);
}