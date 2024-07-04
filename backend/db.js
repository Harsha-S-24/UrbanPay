const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/UrbanPay");


const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please Enter a User Name"],
        unique:true,
        lowercase: true,
        minLength:3,
        maxLength:30,
        trim:true
    },
    password:{
        type:String,
        required:[true,"Please Enter a password"],
        minLength:6,
    },
    firstName:{
        type:String,
        required:[true,"Please Enter a first name"],
        trim:true

    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    }



});

const User=mongoose.model('Users',userSchema);

module.exports={
    User
};