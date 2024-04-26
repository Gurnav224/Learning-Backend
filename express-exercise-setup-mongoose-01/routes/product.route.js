

const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
const {Schema} = mongoose;

const {Product} = require('../models/proudct.model')

router.route('/')
.get(async(req,res)=>{
    try {
        const products = await  Product.find({})
        res.json({products,success:true})
    } catch (error) {
        res.status(500).json({success:false,message:'unable to get proudcts',errorMessage:error.message})
    }
})
.post(async(req,res)=>{
    const product = req.body;
    console.log(product)
    try {
     const newProduct = new Product(product);
     const savedProduct = await newProduct.save();
     console.log(savedProduct);

     res.status(201).json({product:savedProduct,success:true})
    } catch (error) {
        res.status(500).json({success:false,message:'unable to save product',errorMessage:error.message})
    }
})



const checkId = (req,res,next)=>{
    console.log('params',req.params);
    req['paramsChecked'] = true;
    next()
}

router.use('/:id',checkId)

router.route('/:id')
.get(async(req,res)=>{
    const {id} = req.params;
    console.log(req.paramsChecked);
    const { name } = req.query;
    console.log({ name });
    try {
        const product = await Product.findById(id);
        res.json({product,success:true})
    } catch (error) {
        res.status(500).json({success:false,message:'unable to find  product',errorMessage:error.message})
    }
})
.put(async(req,res)=>{
    const {id} = req.params;
    const updateProduct = req.body;

    console.log(updateProduct)

    try {
        // Ensure that the updateProduct object is not empty
        if (Object.keys(updateProduct).length === 0) {
            return res.status(400).json({ success: false, message: 'Request body is empty' });
        }

        const product = await Product.findByIdAndUpdate(id, updateProduct, { new: true });

        // Check if the product exists
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Log the updated product
        console.log('Updated product:', product);

        // Send the updated product in the response
        res.json({ product, success: true });
    } catch (error) {
        res.status(500).json({success:false,message:'unable to update  product',errorMessage:error.message})
    }
})
.delete(async(req,res)=>{
    const {id} = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        console.log("delete",product)
        res.json({product,success:true})
    } catch (error) {
        res.status(500).json({success:false,message:'unable to update  product',errorMessage:error.message})
    }
})



module.exports = router;