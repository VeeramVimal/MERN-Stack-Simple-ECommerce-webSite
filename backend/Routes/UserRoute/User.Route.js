const express =require('express');
const app = express();
const router = express.Router()

const UserController =require('../../Controllers/UserController/User.Controller')
const nodemailer =require('nodemailer');

///login 
router.post('/logUser',UserController.Auth_User);

///get list od user details
router.get('/getUser', UserController.get_user);

///create user new details
router.post('/addUser',UserController.add_user);

///User get-by-id
router.get('/editUser/:id',UserController.edit_user);

///User details update
router.put('/updateUser/:id',UserController.update_user);

///delete user
router.get('/deleteUser/:id',UserController.delete_user);

//mail send 
router.post('/sendMail',UserController.send_user);


module.exports=router;

