
const mongoose = require("mongoose");
const {users} = require('../data.js');
const {Schema} = require("mongoose");


const UserSchema = new Schema({
    createdAt:Number,
    updatedAt:Number,
    _id:{type:Schema.Types.ObjectId,ref:'Auth'},
    wishList:[{prouductId:{type:Schema.Types.ObjectId,ref:'Product'}}],
    cart:[{
        productId: { type: Schema.Types.ObjectId, ref: 'Product' }, 
        quantity: Number
    }],
    addresses:[{
        name:{
            type:String,
            required:[true,'Please add your name']
        },
        phoneNumber:{
            type:String,
            required:[true,'Please add your Phone Number']
        },
        zipCode:{
            type:Number,
            required:[true,'Please add your zip code']
        },
        city:{
            type:String,
            required:[true,'Please add your city']
        },
        address:{
            type:String,
            required:[true,'Please add your address']
        },
        state:{
            type:String,
            required:[true,'Please add your state']
        },
        country:{
            type:String,
            required:[true,'Please add your country']
        },
        addressType:{
            type:String,
            enum:{
                values:['Home','Office'],
                message:`{Value} is not supported`
            },
            required:[true,'Please add your address Type']
        }
    }]
},
{
    timestamps:{currentTime:()=>Math.floor(Date.now()/1000)}
}

)

const User = mongoose.model('User',UserSchema);

const addUserToDB = ()=>{
    users.forEach(async (user)=>{
        const NewUser =  new User(user)
        const savedUser = await NewUser.save();
        console.log(savedUser)
    })
}


module.exports = {User,addUserToDB};