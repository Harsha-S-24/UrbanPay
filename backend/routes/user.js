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
    const newUser= new User({
        username:req.body.username,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
    });
    const hashedPassword= await newUser.createHash(req.body.password);
    const userId=newUser._id;
    newUser.password_hash=hashedPassword;
    await newUser.save();
    const token=jwt.sign({
        userId
    },JWT_SECRET);
    return res.status(201).json({
        message:"User Created Successfully",
        token:token
    })
}));

const signinBody=zod.object({
    username:zod.string().email(),
    password:zod.string(),
})
router.post('/signin',asyncHandler(async (req,res)=>{
    const {success} =signinBody.safeParse(req.body);
    if(!success){
        return res.json(411).json({
            message:"Incorrect Inputs"
        })
    }
    let user= await User.findOne({username:req.body.username});
    if(!user){
        return res.status(400).json({
            message:"User Not Found"
        })
    }
    else{
        if(await user.validatePassword(req.body.password)){
            const token=jwt.sign({
                userId:user._id},JWT_SECRET);
            return res.status(200).json({
                message:"User Successfully Logged in",
                token:token
            })
        }else{
            return res.status(400).json({
                message:"Incorrect Password",
            })
           
        }


    }
    return res.status(411).json({
        message:"Error while loggin in"
    })
}))
module.exports=router;