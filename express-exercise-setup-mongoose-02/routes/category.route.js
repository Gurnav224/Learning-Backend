
const express = require('express');
const router = express.Router();

const Category = require('../model/category.model');
const { extend } = require('lodash');

router.route('/')
.get(async(req,res)=>{
    try {
        const categories = await  Category.find({});
        res.json({categories,success:true})
        
    } catch (error) {
        res.status(500).json({success:false,messsage:'unable to get categories',errorMessage:error.messsage})
    }
})
.post(async (req,res)=>{
    const category = req.body;
    try {
        const categories  = new Category(category);
        const savedCategory = await categories.save();
        res.status(201).json({product:savedCategory,success:true})
    } catch (error) {
        res.status(500).json({success:false,messsage:'unable to save product',errorMessage:error.messsage})
    }
})


router.param('id',async(req,res,next,id)=>{
 try {
    const category = await Category.findById(id);
    if(!category){
        return res.status(400).json({messsage:'category not found'})
    }
    req.category = category;
    next()
 } catch (error) {
    return res.status(400).json({ message: "Try again later" })
 }
})

router.route('/:id')
.get((req,res)=>{
    let newCategory = req.category;
    console.log(newCategory)
   newCategory.__v = undefined;
   res.json({newCategory,success:true})
})
.post(async (req,res)=>{
    const categoryUpdates = req.body;

    try {
        let {category} = req;
        category = extend(category,categoryUpdates);
        category = await category.save();
        res.json({category,success:true})
    } catch (error) {
        
    }
})


module.exports = router;

