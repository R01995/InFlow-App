const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
    userEmail : {type: String},
    supplierId : {type: mongoose.Schema.Types.ObjectId},

    vatTax : {type: Number},
    discount  : {type: Number},
    otherCost : {type: Number},
    shippingCost : {type: Number},
    grandTotal : {type: Number},
    details : {type: String},
    createdDate : {type: Date, default: Date.now()}
}, { versionKey: false });

const PurchaseModel = mongoose.model("purchases", purchaseSchema);

module.exports = PurchaseModel

