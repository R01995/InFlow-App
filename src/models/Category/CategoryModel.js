const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    userEmail : {type: String},
    name: {type: String},
    createdDate : {type: Date, default: Date.now()}
}, { versionKey: false });

const CategoryModel = mongoose.model("categories", categorySchema);

module.exports = CategoryModel