
const express = require('express');
const router = express.Router();

const {Category} = require('../model/category.model')

router.route('/')
.get(async(req,res)=>{
    try {
        const category = await Category.find({});
        res.status(200).json({success:true,category})
    } catch (error) {
        res.status(500).json({success:false,message:'unable to get category',error:error.message})
    }
})
.post(async (req,res)=>{
    const category = req.body
    try {
        const newCategory = new Category(category);
        const savedCategory = await newCategory.save();
        res.json({success:true,savedCategory})
    } catch (error) {
        res.status(500).json({success:false,message:'unable to add new  category',error:error.message})
    }
})


router.route('/:id')
.get(async (req,res)=>{
    const {id} = req.params;

    try {
        const category = await Category.findById(id);
        res.json({success:true,category})
    } catch (error) {
        res.status(500).json({success:false,message:'unable to get category by id',error:error.message})
    }
})
.post(async (req,res)=>{
    const {id} = req.params;
    const updateCategory = req.body;
    try {
        const category = await Category.findByIdAndUpdate(id,updateCategory,{new:true});
        res.status(200).json({success:true,category})
    } catch (error) {
        res.status(500).json({success:false,message:'unable to update category by id',error:error.message})
    }
})
.delete(async (req,res)=>{
    const {id} = req.params;
    try {
        const category = await Category.findByIdAndDelete(id);
        res.json({success:true,category})
    } catch (error) {
        res.status(500).json({success:false,message:'unable to delete category ',error:error.message})
    }
})
module.exports = router;