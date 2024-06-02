const ExpenseReportService = require("../services/Report/ExpenseReportService")
const purchaseReportService = require("../services/Report/PurchaseReportService")
const ReturnReportService = require("../services/Report/ReturnReportService")
const SalesReportService = require("../services/Report/SalesReportService")


exports.ExpenseReportByDate = async (req, res) => {
    let result = await ExpenseReportService(req)
    res.status(200).json(result)
}

exports.PurchaseReportByDate = async (req, res) => {
    let result = await purchaseReportService(req)
    res.status(200).json(result)
}

exports.SalesReportByDate = async (req, res) => {
    let result = await SalesReportService(req)
    res.status(200).json(result)
}

exports.ReturnReportByDate = async (req, res) => {
    let result = await ReturnReportService(req)
    res.status(200).json(result)
}