
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

let Sub_CatagorySchema = new Schema({


    Catagory_id: {
         type: Mongoose.Schema.Types.ObjectId, ref: 'catagories' 
    },
    SubCatagory_name: {
        type: String,
  
    },
  
},{
    collection: "Sub_Catagories"

});

module.exports = Catagory = Mongoose.model('Sub_Catagories',Sub_CatagorySchema);

// module.exports=Mongoose.model('items', user)