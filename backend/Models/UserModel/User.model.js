const Mongoose = require('mongoose')
const Schema = Mongoose.Schema
// const User = require('../Controllers/User.Controller');

const Bcrypt = require("bcryptjs")
let userSchema = new Schema({
    Email:{
        type: String,
    },
    Password:{
        type: String,
    },
},{
    collection: "user"

});

module.exports=User=Mongoose.model('user', userSchema)