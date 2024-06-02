const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require('multer');
const route = require("./src/router/Api");



app.use(cors());
app.use(bodyParser.json());



//Conecting  with MongoDB database
const uri = `mongodb+srv://prictic:<password>@cluster0.l0f9rc6.mongodb.net/InFlow-App?retryWrites=true&w=majority`;
//mongodb+srv://prictic:prictic@cluster0.l0f9rc6.mongodb.net/
const options = {user:"prictic", pass:"prictic"};

mongoose.connect(uri, options)
    .then(() => {
        console.log("DB connected")
    })
    .catch((err) => {
        console.log(err)
    })

//Conecting  with MongoDB database end

app.use("/api/v1",  route)


module.exports = app