const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config()


const {initializeDBConnection} = require('./db/db.connect');

initializeDBConnection()
const logParams = require('./middlewares/log-url-params.middlewares');
const reqType = require('./middlewares/request-Type.middlewares');
const {productId }= require('./middlewares/product-id.middlewares');
const {errorHandler} = require('./middlewares/errorHandler.middlewares');
const {routeNotFound} = require('./middlewares/route-not-found.middlewares')

const PORT = process.env.PORT || 4000;
const app = express();


app.use('/prouducts/:id',logParams)
app.use('/prouducts/:id',productId)
app.use(reqType)

const productv1  = require('./routes/product.route');
const categories = require('./routes/category.route');







app.use(bodyParser.json());
app.use(cors());
app.use('/v1/products',productv1);
app.use('/categories',categories);


app.get('/',(req,res)=>{
    res.send('<h1>Server started</h1>')
})

app.get('/about',(req,res)=>{
    res.send('<h1>This is about page </h1>')
})


app.use(errorHandler)
app.use(routeNotFound)

app.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`)
})