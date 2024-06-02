const BrandsModel = require("../models/Brands/BrandsModel")
const ProductsModel = require("../models/Product/ProductModel")
const AssocialteVerificationService = require("../services/common/AssocialteVerificationService")
const CreateService = require("../services/common/CreateService")
const DetailsServiceById = require("../services/common/DetailsServiceById")
const DropDownService = require("../services/common/DropDownService")
const ListService = require("../services/common/ListService")
const UpdateService = require("../services/common/UpdateService")
const DeleteService = require("../services/common/DeleteService")
const mongoose = require("mongoose")



exports.CreateBrand = async (req, res) => {
    let result = await CreateService(req, BrandsModel)
    res.status(200).json(result)
}

exports.BrandDetailsById = async (req, res) => {
    let result = await DetailsServiceById(req, BrandsModel)
    res.status(200).json(result)
}

exports.UpdateBrand = async (req, res) => {
    let result = await UpdateService(req, BrandsModel)
    res.status(200).json(result)
}

exports.BrandDropDown = async (req, res) => {
    let result = await DropDownService(req, BrandsModel, {_id: 1, name: 1})
    res.status(200).json(result)
}

exports.BrandList = async (req, res) => {
    let searchRegex = {"$regex": req.params.searchText, "$options": "i"};
    let array = [{name: searchRegex}];
    let result = await ListService(req, BrandsModel,array);
    res.status(200).json(result);
}


// Brand Delete

const ObjectId = mongoose.Types.ObjectId

exports.BrandDelete = async (req, res) => {

    let deleteId = req.params.id

    // check mongoose id validation
    const Id = ObjectId.isValid(deleteId) ? new ObjectId(deleteId) : null;

    if(!Id){
        return res.status(200).json({status:"fail", data:"Invalid Brand Id"})
    }

    // check association before deleting

    let checkAssociation = await AssocialteVerificationService({brandId: Id},ProductsModel )

    if(checkAssociation){
        return res.status(200).json({status:"fail", data:"Brand is associated with Products"})
    }
    else{
        let result= await DeleteService(req, BrandsModel)
        return res.status(200).json(result)
    }
}