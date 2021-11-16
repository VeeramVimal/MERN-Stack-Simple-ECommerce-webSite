// const User = require('../Models/User.model')
const userModel = require('../../Models/UserModel/User.model');
const bcryptjs = require("bcryptjs");
const Keys =require('../../Config/Keys');
const nodemailer =require("nodemailer");
const Validate =require("../../Helper/Validate");
const jwt = require("jsonwebtoken");

module.exports.get_user = (req,res) => {
    userModel.find().sort({date:-1})
    .then(user =>{
        res.json(user)
    });
}

///create new user
module.exports.add_user = (req,res) => {
    var newUser = new userModel(req.body);
    newUser.Password = bcryptjs.hashSync(req.body.Password, 10);
    newUser.save()
    .then(user =>{
        res.status(200).json(Validate.add_user)
    })
    .catch(err =>{
        console.log('error', err);
        res.status(400).send(Validate.error)
    })
};

///userid get
module.exports.edit_user = (req,res) =>{
        var id = req.params.id;
        userModel.findById(id, function (err, user) {
        res.json(user);
        });
}

///update details 
module.exports.update_user = (req,res) => {
    userModel.findByIdAndUpdate({_id: req.params.id},req.body).then(function(user){
        res.json(Validate.update)
    })
    .catch(err =>{
        res.status(400).send(Validate.Unable_update);
    });
}

// Delete User details 
module.exports.delete_user = (req,res) => {
    userModel.findByIdAndDelete({_id: req.params.id}).then(function(err, item){
        if(err) res.json(err)
        else res.json(Validate.deleted);
    });
}
/// send mail 
module.exports.send_user =(req, res) =>{
    const Transport = nodemailer.createTransport({
        host: Keys.host,
        port: Keys.port,
        secure: false, 
        auth: {
          
            user: Keys.user, // generated ethereal user
            pass: Keys.password, // generated ethereal password
        }
    });
    var mailOption ={
        from: Keys.from,
        to:'vimalraj.wealwin@yopmail.com',
        subject:'your Registration has been Successfull ',
        html:"Welcome to Happy Shopping",
    }
    Transport.sendMail(mailOption, function(err, info){
        if(err){
            console.log(err);
        }else{
            console.log('Email send: '+info.response);
        }
    });
}

///login user email and password
module.exports.Auth_User = (req, res) => {
    let Email = req.body.Email
    let Password = req.body.Password
    userModel.findOne({ Email }).then(user => {
        if (!user) {
            //if user not exist than return status 400
            return res.status(400).json({ status: false, message: Validate.invalid_email })
        }
        //if user exist than compare password
        //password comes from the user
        //user.password comes from the database
      bcryptjs.compare(Password, user.Password, (err, data) => {
                 if (err) throw err

            //if both match than you can do anything
            if (data) {
                let token =jwt.sign({
                    user_id: user.id,
                    Email : user.Email,
                },"secrets",{
                    expiresIn: '1hr'
                })
                return res.status(200).json({data: token, message: Validate.User_log})          
            } else {
                return res.status(401).json({  status: false, message: Validate.pass_machErr})
            }


        })
    })
}
