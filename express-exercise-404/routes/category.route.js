const express = require("express");
const router = express.Router();

const categories = [
    { id: 111, name: "Category 1", noOfProducts: 2 },
    { id: 222, name: "Category 2", noOfProducts: 5 }
  ]
  let counterId = 333;


router.route('/').get((req,res)=>{
 res.json({categories,success:true})
}).post((req,res)=>{
    const {name,noOfProducts} = req.body;

    const newCategory = {name,noOfProducts,id:counterId++}
     categories.push(newCategory)
   res.json({newCategory , success:true})
})


router.route('/:id').get((req,res)=>{
    const {id} = req.params;
    const category = categories.find((category)=>category.id==id);
    res.json({category,success:true})
})
.post((req,res)=>{
    const {id} = req.params;
    const updatedCategory = req.body;

    categories.forEach((category)=>{
        if(category.id==id){
            Object.keys(category).forEach((key)=>{
                category[key] = updatedCategory[key]
            })
        }
    })

    res.json({updatedCategory,success:true})
})

module.exports = router;
