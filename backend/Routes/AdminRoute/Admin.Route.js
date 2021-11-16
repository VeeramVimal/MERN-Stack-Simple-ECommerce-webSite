const express = require('express');
const app = express();
const router = express.Router()

const multer = require("multer");

const AdminController = require('../../Controllers/AdminController/Admin.Controller');
const catagoryController = require('../../Controllers/AdminController/Catagory.Controller');
const subcatagoryController = require('../../Controllers/AdminController/Sub_Catagory.controller');
const productController = require('../../Controllers/AdminController/Products.Controller');
const coupenController = require('../../Controllers/AdminController/Coupon.Controller');
const Croncontroller =require('../../Controllers/Cron/Cron');
// const nodemailer =require('nodemailer');
const path = require("path");

///admin login 
router.post('/logUser', AdminController.Auth_admin);

// image stored product

var storage = multer.diskStorage({
    destination: "./public/images/product/",
    filename: function (req, file, cb) {
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: storage
})

router.post("/image", upload.any(), productController.add_product);

///get list od admin details
router.get('/getAdmin', AdminController.get_admin);
router.get('/getCatagory', catagoryController.get_catagory);
router.get('/getsubCatagory', subcatagoryController.get_subcatagory);
router.get('/getProduct', productController.get_product); 
router.get('/getPercentage', productController.get_percentage); 
router.get('/getCoupen', coupenController.get_coupon);

//create admin new details
router.post('/addAdmin', AdminController.post_admin);
router.post('/addcatagory', catagoryController.add_catagory);
router.post('/addsubcatagory', subcatagoryController.add_subcatagory);
router.post('/coupen',coupenController.add_Coupon);
router.post('/addCoupen',coupenController.added_coupon);

//admin get-by-id
router.get('/editAdmin/:id', AdminController.edit_admin);
router.get('/editCatagory/:id', catagoryController.edit_catagory);
router.get('/editsubCatagory/:id', subcatagoryController.edit_subcatagory);
router.get('/editProduct/:id', productController.edit_product);

//admin details update
router.put('/updateAdmin/:id', AdminController.update_admin);
router.put('/updateCatagory/:id', catagoryController.update_catagory);
router.put('/updatesubCatagory/:id', subcatagoryController.update_subcatagory);
router.put('/updateProduct/:id', productController.update_product);

//delete admin
router.get('/deleteAdmin/:id', AdminController.delete_admin);
router.delete('/deleteCatagory/:id', catagoryController.delete_catagory);
router.delete('/deletesubCatagory/:id', subcatagoryController.delete_subcatagory);
router.delete('/deleteProduct/:id', productController.delete_product);

///cron
// router.post('/cron', Croncontroller.Cron_admin);


module.exports = router;
