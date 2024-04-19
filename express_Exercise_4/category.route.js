const express = require("express");
const router = express.Router();

const categories = [
    { id: 111, name: "Category 1", noOfProducts: 2 },
    { id: 222, name: "Category 2", noOfProducts: 5 }
  ]
  let counterId = 333

  router.get('/',(req,res)=>{
    res.json({categories,success:true})
  })

  router.get('/:id',(req,res)=>{
    const {id} = req.params;
    const category = categories.find((category)=>category.id===parseInt(id,10));
    res.json({category,success:true})
  })

  // post

  router.post('/',(req,res)=>{
    const {name, noOfProducts} = req.body;
    categories.push({name,noOfProducts,id:counterId++});
    res.json({categories,success:true})
  })

  router.post('/:id',(req,res)=>{
    const {id} = req.params;
    const updatedProduct = req.body;
    
    categories.forEach((category)=>{
        if(category.id===parseInt(id,10)){
            Object.keys(updatedProduct).forEach((key)=>{
                if(key in category){
                    category[key] = updatedProduct[key]
                }
            })
        }
    })
    
    console.log(updatedProduct)

res.json({categories,success:true})
  })

module.exports = router;