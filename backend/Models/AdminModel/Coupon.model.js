
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

let CouponSchema = new Schema({

    couponCodeName: {
        type: String,
  
    },
    Price: {
        type: Number,
  
    },
    Discount:{
        type: Number,
    },
    
    Offer_Price:{
        type: Number,
    },  

},{
    collection: "Coupon"

});

module.exports = Coupon = Mongoose.model('Coupon',CouponSchema);

// module.exports=Mongoose.model('items', user)