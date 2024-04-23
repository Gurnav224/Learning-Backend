const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser");

const productv1 = require('./product.v1.route');
const categories = require('./category.route')
const logParams = require('./logParams.Middlewares');
const productId = require('./product.middlewares');
const app = express();


app.use('/v1/products/:id',productId)
app.use('/v1/products/:id',logParams)

app.use(bodyParser.json());
app.use(cors());
app.use('/v1/products',productv1);
app.use('/categories',categories)

const PORT = 3000;

app.get('/',(req,res)=>{
  res.send('<h1>This is Home page </h1>')
})

app.get('/about',(req,res)=>{
    res.send('<h1>This is about page</h1>')
})

app.listen(PORT,(req,res)=>{
    console.log(`Server started at http://localhost:${PORT} `)
})