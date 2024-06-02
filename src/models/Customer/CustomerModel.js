const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    userEmail : {type: String},
    customerName: {type: String},
    phone: {type: String, unique: true},
    email: {type: String},
    address: {type: String},
    createdDate : {type: Date, default: Date.now()}
}, { versionKey: false });

const CustomerModel = mongoose.model("customers", customerSchema);

module.exports = CustomerModel