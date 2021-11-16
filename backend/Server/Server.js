const express = require("express");
const bodyParser = require('body-parser');
const Express=require('express');
const  Mongoose  = require('mongoose');
const cors = require ("cors");
const config = require('../Config/Config')
// const Smtp =require('../Models/Smtp.model')

var app = Express();

const mongodbUrl = config.MONGODB_URL ;
//create db
Mongoose
    .connect(mongodbUrl, { useNewUrlParser: true }, (error, database) => {
        if (!error) {
            //   throw error
            console.log("success")
        }
        else {
            console.log("error connection to the db")
        }

    });

///router connect

const userRoute =require('../Routes/UserRoute/User.Route');
const adminRoute = require('../Routes/AdminRoute/Admin.Route');
const imageRoute = require('../Controllers/middleware/middleware');
// const imageRoute = require('../Routes/')

    app.use(cors());
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(express.static('public'));
    
    // const port = process.env.PORT || 8000
    const port = config.PORT

    app.use('/User', userRoute);
    app.use('/Admin', adminRoute);
    app.use('/image', imageRoute);
  

    const server = app.listen(port, function () {
        console.log('Server Lisening On Port : ' + port);
    });
    