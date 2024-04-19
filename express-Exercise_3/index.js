const express = require("express");
const bodyParser = require("body-parser");



const PORT = 3000;

const app = express();
let counterId = 125;
const router = require('./product.router');



app.use(bodyParser.json())




app.get('/',(req,res)=>{
    res.send({message:'server started'})
})

app.get('/about',(req,res)=>{
    res.send('this is about page')
})

// This would come from a DB
const products = [
    { id: 123, name: "japani joota", price: 1200 },
    { id: 124, name: "jalebi", price: 500 }
  ]
  
  const cart = [
    { name: "japani joota", price: 1200, quantity: 1 },
    { name: "jalebi", price: 500, quantity: 1 }
  ]
  
  const categories = [
    { id: 111, name: "Category 1", noOfProducts: 2 },
    { id: 222, name: "Category 2", noOfProducts: 5 }
  ]

  app.get('/products',(req,res)=>{
   res.json({products})
  })

  app.get('/products/:id',(req,res)=>{
    const {id} = req.params;
    const product = products.find((product)=>product.id===parseInt(id));
    res.json({product})
  })

  // post data to server

  app.post('/products',(req,res)=>{
    const {name,price} = req.body;
    products.push({name,price,id:counterId++});
    res.json({products,success:true})
  })

  app.post('/products/:id',(req,res)=>{
    const {id} = req.params; 

    const updatedProduct = req.body;
   
    products.forEach((product)=>{
        if(product.id === parseInt(id,10)){
            Object.keys(updatedProduct).forEach((key)=>{
                if(key in product){
                    product[key] = updatedProduct[key]
                }
            })
        }
    })
res.json({products,success:true})

  })


  // categories

  app.get('/categories',(req,res)=>{
    res.json({categories})
  })

  app.get('/categories/:id',(req,res)=>{
    const {id} = req.params
    const category = categories.find((category)=>category.id===parseInt(id))
    res.json({category})
  })

  // post 

app.post('/categories',(req,res)=>{
    const updateCategory = req.body;

    categories.push({...updateCategory,id:counterId++});
    res.json(categories)
})


app.post('/categories/:id',(req,res)=>{
    const {id} = req.params;
    const updateCategory = req.body;
    categories.forEach((category)=>{
        if(category.id === parseInt(id,10)){
            Object.keys(updateCategory).forEach((key)=>{
                if(key in category){
                    category[key] = updateCategory[key]
                }
            })
        }
    })
    res.json({categories,success:true})
})

app.use((req,res)=>{
    res.status(404).json({success:false,message:"Page not found"})
})



app.listen(PORT,()=>{
    console.log(`server started at https://localhost:${PORT}`)
})