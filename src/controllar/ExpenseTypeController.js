const ExpenseTypeModel = require("../models/Expense/ExpenseTypeModel")
const CreateService = require("../services/common/CreateService")
const DetailsServiceById = require("../services/common/DetailsServiceById")
const DropDownService = require("../services/common/DropDownService")
const ListService = require("../services/common/ListService")
const UpdateService = require("../services/common/UpdateService")

exports.CreateExpenseType = async (req, res) => {
    let result = await CreateService(req, ExpenseTypeModel)
    res.status(200).json(result)
}


exports.ExpenseTypeDetailsById = async (req, res) => {
    let result = await DetailsServiceById(req, ExpenseTypeModel)
    res.status(200).json(result)
}

exports.ExpenseTypeUpdate = async (req, res) => {
    let result = await UpdateService(req, ExpenseTypeModel)
    res.status(200).json(result)
}

exports.ExpenseTypeDropDown = async (req, res) => {
    let result = await DropDownService(req, ExpenseTypeModel, {_id: 1, name: 1})
    res.status(200).json(result)
}

exports.ExpenseTypeList = async (req, res) => {
    let searchRegex = {"$regex": req.params.searchText, "$options": "i"};
    let array = [{name: searchRegex}];
    let result = await ListService(req, ExpenseTypeModel,array);
    res.status(200).json(result);
}