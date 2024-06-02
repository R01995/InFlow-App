const mongoose = require("mongoose");
const salesSchema = new mongoose.Schema(
    {
        userEmail : {type: String},
        customerId : {type: mongoose.Schema.Types.ObjectId},
    
        vatTax : {type: Number},
        discount  : {type: Number},
        otherCost : {type: Number},
        shippingCost : {type: Number},
        grandTotal : {type: Number},
        details : {type: String},
        createdDate : {type: Date, default: Date.now()}
    },
    { versionKey: false }
);
const SalesModel = mongoose.model("sales", salesSchema);

module.exports = SalesModel

