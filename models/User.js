const mongoose = require('mongoose')


const UserSchema=new mongoose.Schema({
    name: {type:String, required:true,trim:true},
    email: {type:String, required:true, unique:true, trim:true},
    mobile: {type:String, required:true, unique:true},
    password: {type:String, required:true ,trim:true},
    otp:{type:String,default:0},
    role: {type:String, enum:["user","admin"],default:'user'},
    isActive: {type:Boolean, default:true}
  
},{
    collection:"Moviesusers", 
    timestamps:true,

})

module.exports=mongoose.model('UserModel',UserSchema)