const mongoose = require("mongoose");

const purchasesProductSchema = new mongoose.Schema({
    userEmail : {type: String},
    productId : {type: mongoose.Schema.Types.ObjectId},
    
    quantity : {type: Number}, 
    unitCost : {type: Number}, 
    total : {type: Number}, 

    purchaseId : {type: mongoose.Schema.Types.ObjectId},

    createdDate : {type: Date, default: Date.now()}
}, { versionKey: false });

const PurchaseProductModel = mongoose.model("purchaseProducts", purchasesProductSchema);

module.exports = PurchaseProductModel