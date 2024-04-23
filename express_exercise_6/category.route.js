const express = require("express");
const router = express.Router();

const categories = [
    { id: 111, name: "Category 1", noOfProducts: 2 },
    { id: 222, name: "Category 2", noOfProducts: 5 }
  ]

  let counterId = 333;


router.route("/").get((req,res)=>{
    res.json({categories,success:true})
})
.post((req,res)=>{
    const {name, noOfProducts} = req.body;
    console.log(name,noOfProducts)
        categories.push({name,noOfProducts,id:counterId++});
    res.json({categories,success:true})
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
        if(categories.id===parseInt(id,10)){
            Object.keys(updatedCategory).forEach((key)=>{
                if(key in category){
                    category[key] = updatedCategory[key]
                }
            })
        }
    })
    res.json({updatedCategory,success:true})
})

module.exports = router;
