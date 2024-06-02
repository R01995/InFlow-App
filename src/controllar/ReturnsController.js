const CreateParentChildsService = require("../services/common/CreateParentChildsService");
const ParentModel = require("../models/Returns/ReturnModel")
const ChildModel = require("../models/Returns/ReturnProductsModel");
const ListOneJoinService = require("../services/common/ListOneJoinService");
const DeleteParentChildsService = require("../services/common/DeleteParentChildsService");


exports.CreateReturn = async (req, res) => {
    let result = await CreateParentChildsService (req, ParentModel , ChildModel, 'returnId');
    res.send(result)
}

exports.ReturnList = async (req, res) => {
    let searchRegex = {"$regex": req.params.searchText, "$options": "i"};
    let joinStage = { $lookup: { from: "customers", localField: "customerId", foreignField: "_id", as: "customer" } };
    let searchArray = [{ 'customer.customerName': searchRegex }, { 'customer.phone': searchRegex }, { 'customer.email': searchRegex }, { 'customer.address': searchRegex }, {details: searchRegex}];
    let result = await ListOneJoinService(req, ParentModel, searchArray, joinStage);
    res.status(200).json(result);
}

exports.ReturnDelete = async (req, res) => {
    let result = await DeleteParentChildsService(req, ParentModel, ChildModel, "returnId");
    res.status(200).json(result);
}