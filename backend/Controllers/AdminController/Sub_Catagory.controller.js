
const express = require('express');
const app =express();
const subcatagoryModel = require("../../Models/AdminModel/Sub_Catagory.model");
const Validate =require("../../Helper/Validate");


// router.get('/items', itemController.get_items);


///get list od Product details
module.exports.get_subcatagory = (req, res) =>{
    // db.collection('Sub_Catagories').find({Catagory_id : ObjectId(req.params.Catagory_id)})
    subcatagoryModel.find({}, function(err, Item) {
     
    if(err){
        console.log("error")
        }else{
            res.json(Item)
        }
    });
}

// router.post('/items',itemController.post_item);

// /create new deatils
module.exports.add_subcatagory =(req, res)=>{
    let Item = new subcatagoryModel(req.body);
    Item.save()
        .then(game => {
            // console.log("game",game)
            // console.log("Item",Item)
          
          return res.status(200).json(Validate.add_sub)
        })
        .catch(err =>{
            console.log('error',err)
            res.status(400).send(Validate.error)
        });
}
    // console.log('body',req.body)

  ///edit catagory
module.exports.edit_subcatagory = (req,res) =>{

 
    var id = req.params.id;
    
    subcatagoryModel.findById(id, function (err, user) {

    res.json(user);

    });
}



// router.put('/items/:id',itemController.update_item);


 // To Update The catagory Details

    module.exports.update_subcatagory = (req, res) =>{
        subcatagoryModel.findById(req.params.id, function (err, Item) {
    
            if (!Item)
            return next(new Error(Validate.Find_sub));
            else {
        
                Item.title = req.body.title;
                Item.img = req.body.img;
                Item.description = req.body.description;
                Item.price = req.body.price;
              
                }
                Item.save()
                .then(Item =>{
                 
                    res.json(Validate.Update_sub);
                })
                .catch(err => {
                res.status(400).send(Validate.Unable_sub);
                });
                });
    }

   
// router.delete('/items/:id',itemController.delete_item);


///Delete catagory details 


    module.exports.delete_subcatagory = (req, res) =>{
        subcatagoryModel.findByIdAndRemove({ _id: req.params.id }, function (err, Item) {
            if (err) res.json(err);
            else res.json(Validate.deleted);
            });
    }
  


