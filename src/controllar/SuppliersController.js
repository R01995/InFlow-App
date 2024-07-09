const mongoose  = require("mongoose")
const PurchaseModel = require("../models/Purchases/PurchaseModel")
const SuppliersModel = require("../models/Suppliers/SuppliersModel")
const AssocialteVerificationService = require("../services/common/AssocialteVerificationService")
const CreateService = require("../services/common/CreateService")
const DetailsServiceById = require("../services/common/DetailsServiceById")
const DropDownService = require("../services/common/DropDownService")
const ListService = require("../services/common/ListService")
const UpdateService = require("../services/common/UpdateService")
const DeleteService = require("../services/common/DeleteService")

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


exports.SupplierDelete = async (req, res) => {
    let deleteId = req.params.id;
    const ObjectId = mongoose.Types.ObjectId;
    let checkAssociation = await AssocialteVerificationService({ supplierId: new ObjectId(deleteId) }, PurchaseModel);

    if (checkAssociation) {
        return res.status(200).json({ status: "associate", data: "Supplier is associated with purchase" });
    } else {
        let result = await DeleteService(req, SuppliersModel);
        res.status(200).json(result);
    }
};

    

  
