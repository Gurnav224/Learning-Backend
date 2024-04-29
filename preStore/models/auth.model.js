

const mongoose = require('mongoose');
const {auth,users} = require('../data');
const {Schema} = mongoose;
const {User} = require('./user.model'); 

const AuthSchema = new Schema({
    createdAt:Number,
    updatedAt:Number,
    username:{
        type:String,
        required:[true,'Please add your username'],
        unique:'Username should be unique'
    },
    email:{
        type:String,
        required:[true,'Please enter your Email ID'],
        unique:'EmailId should be unique'
    },
    password:{
        type:String,
        required:[true,'Please enter your password']
    }
}
,
{
    timestamps:{currentTime:()=>Math.floor(Date.now()/1000)}
}
)

const Auth = mongoose.model('Auth',AuthSchema);

const addAuthToDb = ()=>{
    auth.forEach(async (user)=>{
     const newAuthUser = new Auth(user);
     const savedAuthUser = await newAuthUser.save();
     console.log(savedAuthUser)
    })

    users.forEach(async (user)=>{
        const newUser = new User(user);
        const savedUser  = await newUser.save();

        console.log(savedUser)
    })
}


module.exports = {Auth,addAuthToDb};

