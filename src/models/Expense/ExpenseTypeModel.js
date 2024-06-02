const mongoose = require("mongoose");

const ExpenseTypeSchema = new mongoose.Schema({
    userEmail : {type: String},
    name: {type: String},
    createdDate : {type: Date, default: Date.now()}
}, { versionKey: false });

const ExpenseTypeModel = mongoose.model("expenseTypes", ExpenseTypeSchema);

module.exports = ExpenseTypeModel