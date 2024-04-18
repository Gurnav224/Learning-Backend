const express = require("express");

const PORT = 3000;


const app = express()

app.get('/',(req,res)=>{
    res.send('Hello world');
})

app.get('/about',(req,res)=>{
    res.send('This is about page')
})
// This would come from a DB
const products = [
    { name: "japani joota", price: 1200 },
    { name: "jalebi", price: 500 }
  ]

  const cart = [
    { name: "japani joota", price: 1200, quantity: 1 },
    { name: "jalebi", price: 500, quantity: 1 }
  ]


const totalPrice = ()=>{
    return cart.reduce((acc,value)=>{
        return value.price*value.quantity
    },0)
}  

app.get('/products',(req,res)=>{
     // instead of templating via ES6, pug, ejs, mustache
  const productPage = `
  <h1>Products</h1>
  ${products.map((item) => {
  return `<h3>${item.name}</h3><p>Price: ${item.price}</p>`
}).join("")}
`;

res.send(productPage);
})

app.get('/cart', (req, res) => {

    const cartPage = `
      <h1>Cart</h1>
      ${cart.map((item) => {
      return `
        <h3>${item.name}</h3>
        <p>Price: ${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
      `
    }).join("")}
    <h2>Total Price: ${totalPrice()}</h2>
    `;
  
    res.send(cartPage);
  })
  

app.listen(PORT,()=>{
    console.log(`Server Started at https://localhost/${PORT}`)
})