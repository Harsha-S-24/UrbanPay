const express= require("express");
const router = express.Router();
const asyncHandler= require("express-async-handler");
const User=require("../db");
const zod=require("zod");
const jwt=require("jsonwebtoken");
const {JWT_SECRET} =require('../config');

const singupBody=zod.object({
    username:zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string()
})
//express-async-handler is used to handle asynchrounous errors
router.post("/signup",asyncHandler(async (req,res)=>{
    const {success}=singupBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Incorrect Inputs"
        })
    }
    const existingUser=await User.findOne({
        username:req.body.username

    })

    if(existingUser){
        return res.status(411).json({
            message:"Email Already Taken"
        })
    }
    const hashedPassword= await newUser.createHash(req.body.password);
    const newUser= await User.create({
        username:req.body.username,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password_hash:hashedPassword
    });
    const userId=newUser._id;
    const token=jwt.sign({
        userId
    },JWT_SECRET);
    return res.status(201).json({
        message:"User Created Successfully",
        token:token
    })
}));
router.post('/signin',asyncHandler(async (req,res)=>{
    let user= await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).json({
            message:"User Not Found"
        })
    }
    else{
        if(await user.validatePassword(req.body.password)){
            return res.status(200).json({
                message:"User Successfully Logged in"
            })
        }else{
            return res.status(400).json({
                message:"Incorrect Password",
            })
        }

    }
}))
module.exports=router;