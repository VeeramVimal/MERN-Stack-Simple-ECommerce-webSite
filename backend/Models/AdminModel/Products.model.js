
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

let ProductSchema = new Schema({

    Catagory_id: {
        type: Mongoose.Schema.Types.ObjectId, ref: 'catagories'
  
    },
    SubCatagory_id: {
        type: Mongoose.Schema.Types.ObjectId, ref: 'Sub_Catagories'
  
    },
    image:{
        type: Array,
        // data: Buffer,
        // contentType: String,
    },

    title: {
        type: String,
  
    },
  
    description: {
        type: String,

    },
    price: {
        type: Number,
  
    },
    OfferType: {
        type: Number,
  
    },
    OfferValue: {
        type: Number,
  
    },
    MaxOfferLtd: {
        type: Number,
  
    },
   
   

},{
    collection: "Product"

});

module.exports = Product = Mongoose.model('Product',ProductSchema);

// module.exports=Mongoose.model('items', user)