const adminModel = require('../../Models/AdminModel/Admin.model');
const bcryptjs = require("bcryptjs");
const Validate =require("../../Helper/Validate");
const jwt =require("jsonwebtoken");

module.exports.get_admin = (req,res) => {
    adminModel.find().sort({date:-1})
    .then(user =>{
        res.json(user)
    });
}

///create new user
module.exports.post_admin = (req,res) => {
    var newUser = new adminModel(req.body);
    newUser.Password = bcryptjs.hashSync(req.body.Password, 10);
    newUser.save()
    .then(user =>{
        res.status(200).json(Validate.add_Admin)
    })
    .catch(err =>{
        console.log('error', err);
        res.status(400).send(Validate.error)
    })
};

///userid get
module.exports.edit_admin = (req,res) =>{
        var id = req.params.id;
        adminModel.findById(id, function (err, user) {
        res.json(user);
        });
}

///update details 
module.exports.update_admin = (req,res) => {
    adminModel.findByIdAndUpdate({_id: req.params.id},req.body).then(function(user){
        res.json(Validate.update_admin)
    })
    .catch(err =>{
        res.status(400).send(Validate.Unable_update);
    });
}

// Delete User details 
module.exports.delete_admin = (req,res) => {

    adminModel.findByIdAndDelete({_id: req.params.id}).then(function(err, item){
        if(err) res.json(err)
        
        else res.json(Validate.deleted);
    });
}

///login user email and password
module.exports.Auth_admin =(req, res) =>{
    let Email = req.body.Email
    let Password = req.body.Password

    adminModel.findOne({ Email }).then(user => {
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
                return res.status(200).json({data: token, message: Validate.Admin_log})          
            } else {
                return res.status(401).json({  status: false, message: Validate.pass_machErr})
            }
        })
    })
}
