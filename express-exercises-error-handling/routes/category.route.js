
const express = require("express");
const router = express.Router();


let counterId = 333;

const categories = [
    { id: 111, name: "Category 1", noOfProducts: 2 },
    { id: 222, name: "Category 2", noOfProducts: 5 }
  ]

 router.route('/').get((req,res)=>{
    res.json({categories,success:true})
 })
 .post((req,res)=>{
    const {name , noOfProducts} = req.body;
    const newCategory = {name,noOfProducts,id:counterId++};
    categories.push(newCategory);
    res.json({categories,success:true})
 })


 router.route('/:id')
 .get((req,res)=>{
    const {id} = req.params;

    console.log(id)

    const category = categories.find((category)=>category.id===parseInt(id,10));

    if(category){
     return   res.json({category,success:true})
    }
    res.json(404).json({success:true,message:"The category id you requested doesn't exists"})
 })
.post((req,res)=>{
    const {id} = req.params;
    const updatedCategory = req.body;

    categories.forEach((category)=>{
        if(category.id===parseInt(id,10)){
            categories.forEach((category)=>{
                Object.keys(updatedCategory).forEach((key)=>{
                    category[key] = updatedCategory[key]
                })
            })
        }
    })

    res.json({categories,success:true})
})

module.exports = router;