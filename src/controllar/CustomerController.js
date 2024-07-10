const CustomerModel = require("../models/Customer/CustomerModel")
const CreateService = require("../services/common/CreateService")
const DetailsServiceById = require("../services/common/DetailsServiceById")
const DropDownService = require("../services/common/DropDownService")
const ListService = require("../services/common/ListService")
const UpdateService = require("../services/common/UpdateService")
const AssociateVerificationService = require("../services/common/AssocialteVerificationService")
const SalesModel = require("../models/Sales/SalesModel")
const DeleteService = require("../services/common/DeleteService")
const { default: mongoose } = require("mongoose")

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
    let result = await ListService(req, CustomerModel, array);
    res.status(200).json(result);
}

// //delete Customer


exports.CustomerDelete = async (req, res) => {
    let deleteId = req.params.id;
    const ObjectId = mongoose.Types.ObjectId;
    let checkAssociation = await AssociateVerificationService({ customerId: new ObjectId(deleteId) }, SalesModel);
    if (checkAssociation) {
        return res.status(200).json({ status: "associate", data: "Customer is associated with sales" });
    } else {
        let result = await DeleteService(req, CustomerModel);
        res.status(200).json(result);
    }
}