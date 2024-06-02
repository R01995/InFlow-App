const CreateParentChildsService = require("../services/common/CreateParentChildsService");

const ParentModel = require("../models/Sales/SalesModel")
const ChildModel = require("../models/Sales/SalesProductModel");
const ListOneJoinService = require("../services/common/ListOneJoinService");
const DeleteParentChildsService = require("../services/common/DeleteParentChildsService");

exports.CreateSales = async (req, res) => {
    let result = await CreateParentChildsService (req, ParentModel , ChildModel, 'salesId');
    res.send(result)
}

exports.SalesList = async (req, res) => {
    let searchRegex = {"$regex": req.params.searchText, "$options": "i"};
    let joinStage = { $lookup: { from: "customers", localField: "customerId", foreignField: "_id", as: "customer" } };
    let searchArray = [{ 'customer.customerName': searchRegex }, { 'customer.phone': searchRegex }, { 'customer.email': searchRegex }, { 'customer.address': searchRegex }, {details: searchRegex}];
    let result = await ListOneJoinService(req, ParentModel, searchArray, joinStage);
    res.status(200).json(result);
}

exports.SalesDelete = async (req, res) => {
    let result = await DeleteParentChildsService(req, ParentModel, ChildModel, "salesId");
    res.status(200).json(result);
}