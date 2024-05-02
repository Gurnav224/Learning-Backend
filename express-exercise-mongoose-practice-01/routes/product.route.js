const express = require("express");
const router = express.Router();

const {Product} = require('../model/product.model');

router.route('/')
.get(async (req,res)=>{
    try {
        const product = await Product.find({})
        res.json({success:true,product})
    } catch (error) {
        res.status(500).json({success:true,message:'unable to get product',error:error.message})
    }
})
.post(async (req,res)=>{
    const product = req.body;
    try {
        const newProduct = new Product(product);
        const savedProduct = await newProduct.save();
        res.json({success:true,savedProduct})
    } catch (error) {
        res.status(500).json({success:true,message:'unable to get product',error:error.message})
    }
})


router.route('/:id')
.get(async (req,res)=>{
    const {id} = req.params;
    try {
        const product = await Product.findById(id);
        res.json({success:true,product})
    } catch (error) {
        res.status(500).json({success:true,message:'unable to get product by id',error:error.message})
    }
})
.post(async (req,res)=>{
    const {id} = req.params;
    const updatedProduct = req.body;

    try {
        const product = await Product.findByIdAndUpdate(id,updatedProduct,{new:true});
        res.json({success:true,product})
    } catch (error) {
        res.status(500).json({success:true,message:'unable to post product by id',error:error.message})
    }
})
.delete(async (req,res)=>{
    const {id} = req.params;
    try {
        const deleteProduct = await Product.findByIdAndDelete(id);
        res.json({success:true,deleteProduct});
    } catch (error) {
        res.status(500).json({success:true,message:'unable to delete product by id',error:error.message})
    }
})

module.exports = router;
