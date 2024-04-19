const express = require("express");
const bodyParser = require("body-parser");

const PORT  = 3000;

const app = express();

app.use(bodyParser.json())

const products = require("./product.route.js");
const category  = require("./category.route.js");

app.use('/products',products);
app.use('/categories',category);

app.get('/',(req,res)=>{
    res.send('<h1>Home page</h1>')
})

app.get('/about',(req,res)=>{
    res.send('<h1>This is about page</h1>')
})


app.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`)
})