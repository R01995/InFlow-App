const mongoose = require("mongoose");

const salesProductSchema = new mongoose.Schema({
    userEmail : {type: String},
    productId : {type: mongoose.Schema.Types.ObjectId},
    
    quantity : {type: Number}, 
    unitCost : {type: Number}, 
    total : {type: Number}, 

    salesId : {type: mongoose.Schema.Types.ObjectId},

    createdDate : {type: Date, default: Date.now()}
}, { versionKey: false });

const SalesProductModel = mongoose.model("salesProducts", salesProductSchema);

module.exports = SalesProductModel