const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProductSchema = new Schema({
    createAt:Number,
    updatedAt:Number,
    name:{
        type:String,
        required:[true,'name is required']
    },
    modelNo:{
        type:String,
        required:[true,'model no should be unique']
    },
    price:{
        type:Number,
        required:[true,'price is required']
    },
    prodDescription:{
        type:String,
        min:[300,'need more product description']
    }
},{
    timestamps:{currentTime:()=>Math.floor(Date.now/1000)}
}

)

const Product = mongoose.model('Product',ProductSchema);

module.exports = {Product}