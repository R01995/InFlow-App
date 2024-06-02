const ParentModel = require("../models/Purchases/PurchaseModel");
const ChildModel = require("../models/Purchases/PurchaseProductModel");
const CreateParentChildsService = require("../services/common/CreateParentChildsService");
const DeleteParentChildsService = require("../services/common/DeleteParentChildsService");
const ListOneJoinService = require("../services/common/ListOneJoinService");

exports.CreatePurchase = async (req, res) => {
    let result = await CreateParentChildsService (req, ParentModel , ChildModel, 'purchaseId');
    res.send(result)
}

exports.PurchaseList = async (req, res) => {
    let searchRegex = {"$regex": req.params.searchText, "$options": "i"};
    let joinStage = { $lookup: { from: "suppliers", localField: "supplierId", foreignField: "_id", as: "supplier" } };
    let searchArray = [{ 'supplier.supplierName': searchRegex }, { 'supplier.phone': searchRegex }, { 'supplier.email': searchRegex }, { 'supplier.address': searchRegex }, {details: searchRegex}];
    let result = await ListOneJoinService(req, ParentModel, searchArray, joinStage);
    res.status(200).json(result);
}


exports.PurchaseDelete = async (req, res) => {
    let result = await DeleteParentChildsService (req, ParentModel, ChildModel, "purchaseId");
    res.status(200).json(result);
}


