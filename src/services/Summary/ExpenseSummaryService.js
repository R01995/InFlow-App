const ExpenseModel = require("../../models/Expense/ExpenseModel")

const ExpenseSummaryService = async (req) => {


    try{
        let userEmail = req.headers.email

        let data = await ExpenseModel.aggregate([
            {$match: {userEmail: userEmail}},
            {
                $facet: {
                    total : [{$group: {_id: 0, totalAmount: {$sum: "$amount"}}}],
                    last30Days :[
                        {
                            $group: {
                                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdDate" } },
                                totalAmoutn : {$sum: "$amount"}
                            }
                        },
                        { $sort : { _id : -1 } },
                        { $limit : 30 }
                    ]
                }
            }
        ])

        return {status:"success", data: data}

    }

    catch(error){
        return {status:"fail", data: error}
    }

}


module.exports = ExpenseSummaryService