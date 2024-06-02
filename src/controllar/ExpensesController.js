const ExpensesModel = require("../models/Expense/ExpenseModel")
const CreateService = require("../services/common/CreateService")
const DeleteService = require("../services/common/DeleteService")
const DetailsServiceById = require("../services/common/DetailsServiceById")
const DropDownService = require("../services/common/DropDownService")
const ListOneJoinService = require("../services/common/ListOneJoinService")
const UpdateService = require("../services/common/UpdateService")

exports.CreateExpense = async (req, res) => {
    let result = await CreateService (req, ExpensesModel)
    res.status(200).json(result)
}

exports.ExpenseDetailsById = async (req, res) => {
    let result = await DetailsServiceById (req, ExpensesModel)
    res.status(200).json(result)
}

exports.ExpenseUpdate = async (req, res) => {
    let result = await UpdateService(req, ExpensesModel)
    res.status(200).json(result)
}

exports.ExpenseDropDown = async (req, res) => {
    let result = await DropDownService(req, ExpensesModel, {_id: 1, name: 1})
    res.status(200).json(result)
}

exports.ExpenseDelete = async (req, res) => {
    let result = await DeleteService(req, ExpensesModel)
    res.status(200).json(result)
}

exports.ExpenseList = async (req, res) => {
    let searchRegex = {"$regex": req.params.searchText, "$options": "i"};
  
    let JoinStageOne = {$lookup: {from:"expensetypes", localField:"expenseTypeId", foreignField:"_id", as:"Type"}};

    let array = [{amount: searchRegex},{description: searchRegex},{'Type.name': searchRegex}];

    let result = await ListOneJoinService(req, ExpensesModel,array, JoinStageOne );
    res.status(200).json(result);
  }