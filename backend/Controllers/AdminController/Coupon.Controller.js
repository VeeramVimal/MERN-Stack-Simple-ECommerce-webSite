const express = require('express');
const app = express();
const userRoute = express.Router();
const CouponModel = require("../../Models/AdminModel/Coupon.model");
const jwt = require("jsonwebtoken");
const Validate = require("../../Helper/Validate");

module.exports.add_Coupon = async (req, res) => {
    var couponCodeName = 'VROGV';
    const Coupon = await CouponModel.findOne({ couponCodeName: req.body.couponCodeName })
    CouponModel.findById(req.params.id, function (err, Item) {
        if (couponCodeName) {
           
                return {
                    inRange: true,
                    Discount,
                    totalPrice: Price - Discount
                }
        }
         // else {
        //     return {
        //         inRange: false,
        //         // message: `Need to add more items worth ${Coupon.MaxPrice - finalPrice} to the list for this coupon to be enabled.`
        //         message:"Hiii",

        //     }
        // }
        else {
            return {
                inRange: false,
                message: 'Coupon invalid!please use a valid Coupon.'
            }
        }
    })
    // let Item = new CouponModel(couponCodeName);     
    // Item.save()
    //     .then(game => {
    //         return res.status(200).json(Validate.Apply_Success);
    //     })
    //     .catch(err => {
    //         console.log('error', err)
    //         res.status(400).send(Validate.error_Coupon)
    //     });

}

module.exports.get_coupon = (req, res) => {
    CouponModel.find({}, function (err, Item) {
        if (err) {
            console.log("error")
        } else {
            res.json(Item)
        }
    });
}

// /create new deatils
module.exports.added_coupon =(req, res)=>{
    let Item = new CouponModel(req.body);
    Item.save()
        .then(game => {          
          return res.status(200).json(Validate.add_coupen)
        })
        .catch(err =>{
            console.log('error',err)
            res.status(400).send(Validate.error)
        });
}