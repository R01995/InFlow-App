const ExpenseModel = require("../../models/Expense/ExpenseModel")

const ExpenseReportService = async (req) => {

    try{

        let userEmail = req.headers.email
        let formDate = req.body.formDate
        let toDate = req.body.toDate

        let data = await ExpenseModel.aggregate([

            {$match: {userEmail: userEmail, createdDate: {$gte: new Date(formDate), $lte: new Date(toDate)}}},

            {
                $facet: {
                    total : [{$group: {_id: 0, totalAmount: {$sum: "$amount"}}}],
                    data: [{$lookup: {from: "expensetypes", localField: "expenseTypeId", foreignField: "_id", as: "type"}}]
                }
            }


        ])


        return {status:"success", data: data}



    }

    catch(error){
        return {status:"fail", data: error}
    }


}

module.exports = ExpenseReportService