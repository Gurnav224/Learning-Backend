const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const PORT  = process.env.PORT || 5000;

const {intializeDatabase} = require('./db/db.connect');


intializeDatabase()
const logParams = require('./middlewares/log-url-params.middlewares');
const productId = require('./middlewares/product-Id.middlewares');
const {routeNotFound} = require('./middlewares/routeNotFound.middlewares')
const reqType = require('./middlewares/reqType.middlewares')
const {errorHandler} = require('./middlewares/errorHandler.middlewares');

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use('/prouducts/:id',logParams)
app.use('/products/:id',productId)
app.use('/categories/:id',logParams)
app.use(reqType)

const productv1 = require('./routes/product.route');
const categories = require('./routes/category.route');

app.use(errorHandler)
app.use(routeNotFound)

app.use('/products',productv1)
app.use('/categories',categories);


app.get('/',(req,res)=>{
    res.json({message:'server started'})
})


app.get('/about',(req,res)=>{
    res.send('<h1>This is about page </h1>')
})


app.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`)
})