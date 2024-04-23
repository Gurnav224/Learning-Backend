const express = require("express");
const router = express.Router();

// This would come from a DB
let counterId = 125;
const products = [
  { id: 123, name: "japani joota", price: 1200 },
  { id: 124, name: "jalebi", price: 500 }
]

router.route('/').get((req,res)=>{
    res.json({products,success:true})
})
.post((req,res)=>{
    const {name, price} = req.body;
    products.push({name,price});
    res.json({products,success:true})
})

router.route('/:id').get((req,res)=>{
  const {id} = req.params;
  const product = products.find(product=>product.id==id);
  res.json({product,success:true})
})
.post((req,res)=>{
  const {id} = req.params;
  const updatedProduct = req.body;

  products.forEach((product)=>{
    if(product.id===parseInt(id,10)){
      Object.keys(updatedProduct).forEach((key)=>{
        if(key in product){
        product[key]= updatedProduct[key]

        }
      })
    }
  })
  res.json({products,success:true})
})


module.exports = router;