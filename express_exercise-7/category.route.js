const express = require("express");
const router = express.Router();
const categories = [
    { id: 111, name: "Category 1", noOfProducts: 2 },
    { id: 222, name: "Category 2", noOfProducts: 5 }
  ]
  let counterId = 333;

  router.route('/').get((req,res)=>{
    res.json({categories})
  })
  .post((req,res)=>{
    const {name, noOfProducts} = req.body;
    let newProduct = {name,noOfProducts,id:counterId++}
    categories.push(newProduct)
   res.json({categories,success:true})
  })


  router.route("/:id")
  .get((req,res)=>{
    const {id} = req.params;
    const category = categories.find((category)=>category.id==id);

    res.json({category,success:true})
  })
  .post((req,res)=>{
    const {id} = req.params;
    const updateCategory = req.body;

    categories.forEach((category)=>{
        if(category.id===parseInt(id,10)){
            Object.keys(updateCategory).forEach((key)=>{
                if(key in category){
                    category[key] = updateCategory[key]
                }
            })

        }
    })
    res.json({updateCategory,success:true})
  })




module.exports = router;
