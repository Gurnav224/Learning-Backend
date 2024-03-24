import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
const PORT = 3000;
const app = express()

app.use(bodyParser.json());

app.use(cors())

import category from "./category.route.js"

const cart = [
    {name:"Item1",price:500,quantity:1},
    {name:"Item2",price:600,quantity:2},
  ]

  
  const totalPrice = ()=>{
    return cart.reduce((acc,curr)=>{
        return curr.price*curr.quantity+acc
    },0)
  }

  app.use('/category',category)

app.get('/',async(req,res)=>{
    try {
        return res.json(({ message: "Server started " }))
    } catch (error) {
        console.error("error while getting res",error)
        return res.status(500).json({error:`server internal ${server}`})
    }
})

app.get('/cart',(req,res)=>{
    const cartPage = `
    <h2>Cart Page </h2>
    ${cart.map((item)=>`
    <h2>${item.name}</h2>
    <h2>${item.price}</h2>
    <h2>${item.quantity}</h2>
    `).join("")}
    <p>Total price ${totalPrice()}</p>
    `
    res.send(cartPage)
})

app.listen(PORT,()=>{
    console.log(`Server started at  http://localhost:${PORT}`)
})