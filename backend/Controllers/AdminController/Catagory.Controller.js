const express = require('express');
const app =express();
const catagoryModel = require("../../Models/AdminModel/Catagory.model");
const Validate =require("../../Helper/Validate");

///get list od Product details
module.exports.get_catagory = (req, res) =>{
    catagoryModel.find({}, function(err, Item) {
    if(err){
        console.log("error")
        }else{
            res.json(Item)
        }
    });
}

// /create new deatils
module.exports.add_catagory =(req, res)=>{
    let Item = new catagoryModel(req.body);
    Item.save()
        .then(game => {
          return res.status(200).json(Validate.add_Catagory)
        })
        .catch(err =>{
            console.log('error',err)
            res.status(400).send(Validate.error)
        });
}

///edit catagory
module.exports.edit_catagory = (req,res) =>{
    var id = req.params.id;
    catagoryModel.findById(id, function (err, user) {
    res.json(user);
    });
}

 // To Update The catagory Details
    module.exports.update_catagory = (req, res) =>{
        catagoryModel.findById(req.params.id, function (err, Item) {
    
            if (!Item)
            return next(new Error(Validate.update_Catagory));
            else {
        
                Item.title = req.body.title;
                Item.img = req.body.img;
                Item.description = req.body.description;
                Item.price = req.body.price;
              
                }
                Item.save()
                .then(Item =>{
                 
                    res.json(Validate.update_Catagory);
                })
                .catch(err => {
                res.status(400).send(Validate.unable_Catagory);
                });
                });
    }

///Delete catagory details 
    module.exports.delete_catagory = (req, res) =>{
        catagoryModel.findByIdAndRemove({ _id: req.params.id }, function (err, Item) {
            if (err) res.json(err);
            else res.json(Validate.deleted);
            });
    }
  


