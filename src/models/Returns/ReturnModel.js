const mongoose = require("mongoose");
const returnSchema = new mongoose.Schema(
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
const ReturnsModel = mongoose.model("returns", returnSchema);
module.exports = ReturnsModel