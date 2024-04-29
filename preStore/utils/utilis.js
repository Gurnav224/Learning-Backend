

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const {Auth} = require('../models/auth.model');


const findUserByUsername = (username)=>{
    return Auth.findOne({username:new RegExp('^' + username + '$', "i")})
}


const generateToken = (userId)=>{
    return jwt.sign({userId},JWT_SECRET,{expiresIn:'24h'})
}


const populateData = (cart)=>{
    return cart.map((item)=>{
        const {_id,productId,quantity} = item;
        return {_id,productId:{...productId._doc,quantity}}
    })
}

module.exports = {findUserByUsername,generateToken,populateData}