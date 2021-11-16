const express = require('express');
const app =express();
const userRoute = express.Router();
const productModel = require("../../Models/AdminModel/Products.model");
const jwt =require("jsonwebtoken");
const Validate =require("../../Helper/Validate");
const router = require('../../Routes/AdminRoute/Admin.Route');
const Mongoose = require('mongoose');

module.exports.get_product = (req, res) =>{
    productModel.find({}, function(err, Item) {
        // console.log('sfasfsaf',user)
    if(err){
        console.log("error")
        }else{
            res.json(Item)
        }
    });
}

///get list od Product not-available offer details
module.exports.get_percentage = (req, res) =>{
    productModel.aggregate([
        // {$match : {OfferType: { $in: ["3"] } }},
        // { "$match": { "_id": userid } },
        {$match : {OfferType:3}},

        { $limit : 10 },

        {
            $lookup:
            {
                from : 'Sub_Catagories',
                localField: 'SubCatagory_id',
                foreignField:'_id',
                as:'Sub_Catagories',

            }
           
        },

        {$unwind : '$Sub_Catagories' },
        { $sort : { SubCatagory_id:1}},

        {$project :
            {price: true, image: true, title: true, description: true, MaxOfferLtd: true, OfferValue: true, OfferType: true}
        },
    ])
        .then(Item =>{
            res.json(Item);
        })
    
}

// create new deatils
module.exports.add_product = async(req, res)=>{
    var arrayData = [];

    if(req.files && req.files.length > 0) {
        for(let i=0;i<req.files.length;i++){
            let filename = req.files[i].filename
            arrayData.push(filename)
        }
    }
    let newData ={
        title :  req.body.title,
        image :  arrayData,
        description :  req.body.description,
        price :  req.body.price,
        Catagory_id: req.body.Catagory_id,
        SubCatagory_id : req.body.SubCatagory_id,
        OfferType: req.body.OfferType,
        OfferValue: req.body.OfferValue,
        MaxOfferLtd: req.body.MaxOfferLtd,
    }   
    let Item = new productModel(newData);     
    Item.save()
    .then(game => {
        return res.status(200).json(Validate.add_product);
    })
    .catch(err =>{
        console.log('error',err)
        res.status(400).send(Validate.error)
    });
}

  ///edit catagory
  module.exports.edit_product = (req,res) =>{
    var id = req.params.id;
    productModel.findById(id, function (err, user) {
    res.json(user);
    });
}

 // To Update The Employee Details
    module.exports.update_product = (req, res) =>{
        productModel.findById(req.params.id, function (err, Item) {   
            if (!Item)
            return next(new Error(Validate.Find_product));
            else {
                
                Item.title = req.body.title;
                Item.image = req.body.image;
                Item.description = req.body.description;
                Item.price = req.body.price;
                Item.Catagory_id = req.body.Catagory_id;
                Item.SubCatagory_id = req.body.SubCatagory_id;
                Item.OfferType = req.body.OfferType;
                Item.OfferValue = req.body.OfferValue;
                Item.MaxOfferLtd = req.body.MaxOfferLtd;
                            
                }
                Item.save()
                .then(Item =>{
                 
                    res.json(Validate.Update_product);
                })
                .catch(err => {
                res.status(400).send(Validate.unable_product);
                });
                });
    }

///Delete User details 
    module.exports.delete_product = (req, res) =>{
        productModel.findByIdAndRemove({ _id: req.params.id }, function (err, Item) {
            if (err) res.json(err);
            else res.json(Validate.deleted);
            });
    }
  

