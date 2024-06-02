const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
    userEmail : {type: String},
    expenseTypeId: {type: mongoose.Schema.Types.ObjectId},
    amount: {type: Number},
    description: {type: String},
    createdDate : {type: Date, default: Date.now()}
}, { versionKey: false });

const ExpensesModel = mongoose.model("expenses", ExpenseSchema);

module.exports = ExpensesModel