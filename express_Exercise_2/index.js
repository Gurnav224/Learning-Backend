const express = require("express");
const bodyParser = require("body-parser");

const PORT = 4000;


const app = express();

app.use(bodyParser.json())
let counterId = 125;

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
  

app.get('/',(req,res)=>{
    res.send('<h1>Server Started</h1>')
})

app.get('/about',(req,res)=>{
    res.send('<h1>this the about page</h1>')
})

app.get('/products',(req,res)=>{
    res.send({products,success:true})
})

app.get('/products/:id',(req,res)=>{
    const {id} = req.params;
    const product = products.find((product)=>product.id===parseInt(id));
    if(product){

        res.send({product})
    }
    res.send({message:"product didn't exit"})
})


app.get('/categories',(req , res)=>{
    res.send({categories,success:true})
})

app.get('/categories/:id',(req,res)=>{
    const {id} = req.params;
    const category = categories.find((cate)=>cate.id==id);
    if(category){
        res.send({category,success:true})
    }
    else{
        res.send({message:"category didn't exit"})
    }
})

// add new product 

app.post('/products',(req,res)=>{
    const {name, price} = req.body;
    const newProduct = {name,price,id:counterId++};
    products.push(newProduct);

    res.json({products,success:true})
})

app.post('/products/:id',(req,res)=>{
    const {id}= req.params;
    const updateProduct = req.body;

    products.forEach((product)=>{
        if(product.id===parseInt(id,10)){
            Object.keys(updateProduct).forEach((key)=>{
                if(key in product){
                    product[key] = updateProduct[key]
                }
            })
        }
    })

    res.json({products,success:true})
})

app.post('/category',(req,res)=>{
    const {name, noOfProducts} = req.body;
    const newCategory = {name,noOfProducts,id:counterId++};
    categories.push(newCategory);
    res.json({categories,success:true})
})

app.post('/category/:id',(req,res)=>{
    const {id} = req.params;
   const updateCategory = req.body;

   categories.forEach((category)=>{
    if(category.id===parseInt(id,10)){
        Object.keys(updateCategory).forEach((key)=>{
            if(key in category){
                category[key] = updateCategory[key]
            }
        }

        )
    }
   })

   res.json({categories,success:true})
})

app.get('/cart',(req,res)=>{
    const totalPrice = cart.reduce((acc,curr)=>acc+curr.price,0);
    const totalNumberOfProduct = cart.length;

    res.json({
        totalPrice:totalPrice,
        totalNumberOfProduct:totalNumberOfProduct
    })
})

app.listen(PORT,(req,res)=>{
    console.log(`server started http://localhost:${PORT}`)
})