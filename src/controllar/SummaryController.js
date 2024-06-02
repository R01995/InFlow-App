const ExpenseSummaryService = require("../services/Summary/ExpenseSummaryService")
const PurchaseSummaryService = require("../services/Summary/PurchaseSummaryService")
const ReturnSummaryService = require("../services/Summary/ReturnSummaryService")
const SelesSummaryService = require("../services/Summary/SelesSummaryService")



exports.ExpenseSumamry = async (req, res) => {
    let result = await ExpenseSummaryService(req)
    res.status(200).json(result)
}

exports.PurchaseSummary = async (req, res) => {
    let result = await PurchaseSummaryService(req)
    res.status(200).json(result)
}

exports.ReturnsSummary = async (req, res) => {
    let result = await ReturnSummaryService(req)
    res.status(200).json(result)
}

exports.SelesSummary = async (req, res) => {
    let result = await SelesSummaryService(req)
    res.status(200).json(result)
}