
const mongoose = require("mongoose");
const {categories} = require('../data');
const {Schema} = mongoose;

const CategorySchema = new Schema({
    createdAt:Number,
    updatedAt:Number,
    name:{
        type:String,
        required:[true,'Category name is required'],
        unique:'category name should be unique'
    }
}
,{
    timestamps:{currentTime:()=>Math.floor(Date.now()/1000)}
}
)

const Category = mongoose.model('Category',CategorySchema)


const addCategoriesToDB = ()=>{
   categories.forEach(async (category)=>{
    const newCategory = new Category(category);
    const savedCategory = await newCategory.save();
    console.log(savedCategory)
   })
}


module.exports = {Category,addCategoriesToDB}