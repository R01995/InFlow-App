const { default: mongoose } = require("mongoose");
const CategoryModel = require("../models/Category/CategoryModel");
const CreateService = require("../services/common/CreateService");
const DetailsServiceById = require("../services/common/DetailsServiceById");
const DropDownService = require("../services/common/DropDownService");
const ListService = require("../services/common/ListService");
const UpdateService = require("../services/common/UpdateService");
const ProductsModel = require("../models/Product/ProductModel");
const AssocialteVerificationService = require("../services/common/AssocialteVerificationService");
const DeleteService = require("../services/common/DeleteService");

exports.CreateCategory = async (req, res) => {
    let result = await CreateService(req, CategoryModel)
    res.status(200).json(result)
}

exports.CategoryDetailsById = async (req, res) => {
    let result = await DetailsServiceById (req, CategoryModel)
    res.status(200).json(result)
}

exports.CategoryUpdate = async (req, res) => {
    let result = await UpdateService (req, CategoryModel)
    res.status(200).json(result)
}

exports.CategoryDropdown = async (req, res) => {
    let result = await DropDownService (req, CategoryModel,{_id: 1, name: 1})
    res.status(200).json(result)
}


exports.CategoryList = async (req, res) => {
    let searchRegex = {"$regex": req.params.searchText, "$options": "i"};
    let array = [{name: searchRegex}];
    let result = await ListService(req, CategoryModel,array);
    res.status(200).json(result);
}



// Category Delete

const ObjectId = mongoose.Types.ObjectId

exports.CategoryDelete = async (req, res) => {

    let deleteId = req.params.id

    // check mongoose id validation
    const Id = ObjectId.isValid(deleteId) ? new ObjectId(deleteId) : null;

    if(!Id){
        return res.status(200).json({status:"fail", data:"Invalid catagori Id"})
    }

    // check association before deleting

    let checkAssociation = await AssocialteVerificationService({categoryId: Id},ProductsModel )

    if(checkAssociation){
        return res.status(200).json({status:"fail", data:"Category is associated with Products"})
    }
    else{
        let result= await DeleteService(req, CategoryModel)
        return res.status(200).json(result)
    }
}