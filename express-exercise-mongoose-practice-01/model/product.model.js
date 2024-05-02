
const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProductSchema = new Schema({
    name:{
        type:String,
        required:[true,'please add name']
    },
    modelNo:{
        type:String,
        required:[true,'please provide model no']
    },
    price:{
        type:Number,
        required:[true,'please add price']
    },
    prodDescription:{
        type:String,
        required:[true,'please provide product description']
    }
})


const Product = mongoose.model('Product',ProductSchema);

module.exports = {Product}
