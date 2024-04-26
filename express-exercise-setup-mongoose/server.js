const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/e-commerce')
.then(()=>console.log("successfully connected to database"))
.catch((error)=>console.error("error while connected to database",error))
const PORT = 3000;

const app = express();
app.use(bodyParser.json())
app.use(cors());
const logParams = require('./middlewares/log-url-params.middlewares');
const productId = require('./middlewares/prouduct-id.middlewares');
const reqType = require('./middlewares/request-type.middlewares');
const {errorHandler} = require("./middlewares/errorhandler.middleware")
const {routeNotFound} = require('./middlewares/route-not-found.middlewares')
app.use('/v1/products/:id',productId)
app.use(logParams)
app.use(reqType)

const productV1 = require('./routes/product.route');
const category = require('./routes/category.route');




app.use('/v1/products',productV1)
app.use('/categories',category)

app.get('/',(req,res)=>{
    res.send('<h1>Server is running</h1>')
})


app.get('/about',(req,res)=>{
    res.send('<h1>This is about me page</h1>')
})


app.use(errorHandler)
app.use(routeNotFound)

app.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`)
})