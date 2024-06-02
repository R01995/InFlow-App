const mongoose = require("mongoose");

const returnsProductSchema = new mongoose.Schema({
    userEmail : {type: String},
    productId : {type: mongoose.Schema.Types.ObjectId},
    
    quantity : {type: Number}, 
    unitCost : {type: Number}, 
    total : {type: Number}, 

    returnId : {type: mongoose.Schema.Types.ObjectId},

    createdDate : {type: Date, default: Date.now()}
}, { versionKey: false });

const ReturnsProductModel = mongoose.model("returnsProducts", returnsProductSchema);

module.exports = ReturnsProductModel