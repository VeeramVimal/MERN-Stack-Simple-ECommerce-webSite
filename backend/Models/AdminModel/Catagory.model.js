
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

let CatagorySchema = new Schema({

    Catagory_name: {
        type: String,
  
    },
  
},{
    collection: "catagories"

});

module.exports = Catagory = Mongoose.model('catagories',CatagorySchema);

// module.exports=Mongoose.model('items', user)