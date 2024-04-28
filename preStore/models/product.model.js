const mongoose = require("mongoose");
const {products} = require('../data.js');
const {Schema } = mongoose;


const ProductSchema = new Schema({
    name:{
        type:String,
        required:[true,'Please add your productname']
    },
    image: {
        type: String,
        required: [true, 'Please enter Product Image'],
      },
      price: {
        type: Number,
        required: [true, 'Please enter Product Price'],
      },
      material: String,
      brand: String,
      inStock: Boolean,
      fastDelivery: Boolean,
      ratings: Number,
      offer: String,
      idealFor: String,
      category: Array,
      level: String,
      color: String
})


const Product = mongoose.model('Product',ProductSchema);

const addProductsToDB = ()=>{
    products.forEach(async(product)=>{

        console.log("products",product)

        const newProduct = new Product(product);
        const savedProduct = await newProduct.save()
        console.log("saved",savedProduct)

    })
}



module.exports = {Product,addProductsToDB};