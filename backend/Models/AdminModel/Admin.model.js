const Mongoose = require('mongoose')
const Schema = Mongoose.Schema
// const User = require('../Controllers/User.Controller');

const Bcrypt = require("bcryptjs")
let admin = new Schema({
    User:{
        type: String,
    
    },
    Email:{
        type: String,

    },
    
    Password:{
        type: String,
    },

  
},{
    collection: "admin"

});

module.exports=User=Mongoose.model('admin', admin)