const authRoute=require('express').Router();

const {regController,loginController,logoutController,verifyController,updatePassController,forgotPassController, getAllUsersController} =require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

//register
authRoute.post('/register',regController);

//login
authRoute.post('/login',loginController);

//logout
authRoute.get('/logout',logoutController);

//verify email address
authRoute.get('/verify',authMiddleware,verifyController);

//update password
authRoute.patch('/update/Password',updatePassController);

//forgot password request
authRoute.post('/forgot/Password',forgotPassController);

//all users
// authRoute.get("/all", getAllUsersController);



module.exports=authRoute;