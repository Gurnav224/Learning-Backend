
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const {Auth} = require('../models/auth.model');
const {User} = require('../models/user.model');
const {findUserByUsername,generateToken} = require('../utils/utilis');


router.post('/login',async(req,res)=>{
    const {username,password} = req.body;
    try {
        const user = await findUserByUsername(username);
        const token = generateToken(user._id);
        console.log(token)
        if(!user){
            return res.status(404).json({
                success:false,
                errorMessage:'User not found. Check your user credentials'
            })
        }
        const validPassword = await bcrypt.compare(password,user.password);
        if(!validPassword){
            return res.status(403).json({success:false,errorMessage:"Wrong password , Enter correct password "})
        }

        return res.status(200).json({user,token,success:true,message:"login successfull"})
    } catch (error) {
        res.status(500).json({success:false,message:"Something went wrong",errorMessage:error.message})
    }
})



router.post('/signup',async (req,res)=>{
    const{username,email,password} = req.body;
    const userName =  await findUserByUsername(username);
    if(userName === null){
      try {
        const newUser = new Auth({username,email,password});
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password,salt);
        const savedUser = await newUser.save();
        const token = generateToken(savedUser._id);
        const newUserDetails = new User({
            _id:newUser._id,
            wishList:[],
            cart:[],
            addresses:[]
        });
        await newUserDetails.save();
        console.log(newUserDetails)
        return res.status(201).json({user:savedUser,token,success:true,message:"signup successfull"})
      } catch (error) {
        res.status(401).json({success:false,errorMessage:"Error while adding user"})
      }
    }
    return res.status(409).json({ success: false, errorMessage: "User Already Exists" })
})


module.exports = router;