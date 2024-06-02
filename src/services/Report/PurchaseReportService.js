const PurchaseProductModel = require("../../models/Purchases/PurchaseProductModel");

const purchaseReportService = async (req) => {

    try{
        let userEmail = req.headers.email
        let formDate = req.body.formDate
        let toDate = req.body.toDate

        let data = await PurchaseProductModel.aggregate([

            {$match: {userEmail: userEmail, createdDate: {$gte: new Date(formDate), $lte: new Date(toDate)}}},

            {
                $facet: {
                    total : [{$group: {_id: 0, totalAmount: {$sum: "$total"}}}],
                    data: [
                        {$lookup: {from: "products", localField: "productId", foreignField: "_id", as: "products"}},
                        {$unwind: "$products"},
                        {$lookup: {from: "brands", localField: "products.brandId", foreignField: "_id", as: "brands"}},
                        {$lookup: {from: "categories", localField: "products.categoryId", foreignField: "_id", as: "categories"}},
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

module.exports = purchaseReportService