
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Schema} = mongoose;
const {extend} = require('lodash')


const {Product} = require('../model/product.model');


router.route('/')
.get((async (req,res)=>{
    try {
        const products = await Product.find({});
        res.json({products,success:true})

    } catch (error) {
        res.status(500).json({success:false,message:'unable to get Products',errorMessage:error.message})
    }
}))
.post(async (req,res)=>{
    try {
        const {name,modelNo,price,prodDescription} = req.body;
        const product = new Product({ name, modelNo, price, prodDescription });
        const savedProduct = await product.save()
        res.json({savedProduct,success:true})

    } catch (error) {
        res.status(500).json({success:false,message:'unable to save products',errorMessage:error.message})
    }
})

router.param('id',async (req,res,next,id)=>{
try {
    const product = await Product.findById(id);
    if(!product){
        return res.json(400).json({message:"prouduct not found"})
    }
    req.product = product;
    next()
} catch (error) {
    return res.status(500).json({ message: "Try again later" })
}
})

router.route('/:id')
.get(async (req,res)=>{
    let newProduct = req.product;
    console.log(newProduct);
    newProduct.__v = undefined;
    res.json({newProduct,success:true})
})
.post(async (req,res)=>{
    const productUpdates = req.body;
    let {product} = req;
    product = extend(product,productUpdates);
    product = await product.save();
    res.json({product,success:true})
})
.delete(async (req,res)=>{
      let {id} = req.params;
      let product = await Product.findByIdAndDelete(id)
    res.json({product,success:true})
})


module.exports = router;