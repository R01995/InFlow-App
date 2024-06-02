const mongoose = require("mongoose");
const productsSchema = new mongoose.Schema(
    {
        userEmail : {type: String},
        name: { type: String },
        unit: { type: String },
        details: { type: String },
        images : [{ type: String }], 
        categoryId: { type: mongoose.Schema.Types.ObjectId},
        brandId: { type: mongoose.Schema.Types.ObjectId},

        createdDate: { type: Date, default: Date.now() },
    },
    { versionKey: false }
);
const ProductsModel = mongoose.model("products", productsSchema);
module.exports = ProductsModel