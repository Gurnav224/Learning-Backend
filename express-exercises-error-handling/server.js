const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")

const productV1 = require('./routes/product.v1.route');
const categories = require('./routes/category.route')

const PORT = 3000;

const app = express();


app.use(bodyParser.json())


app.use(cors())

const logParams = require('./middlewares/log-url-params.middlewares')
const productId = require('./middlewares/productId.middleware')
const reqType = require('./middlewares/reqType.middlewares')
const {errorHandler }= require("./middlewares/error-handler-middlewares")
const {routeNotFound} = require('./middlewares/route-not-found-middleware')

app.use('/v1/products/:id',logParams)
app.use('/v1/products/:id',productId)
app.use(reqType)

app.use('/v1/products',productV1);
app.use('/categories',categories);

app.get('/',(req,res)=>{
    res.send('<h1>Homepage</h1>')
})


app.get('/about',(req,res)=>{
    res.send('<h1>This is about page</h1>')
})



app.use(errorHandler)
app.use(routeNotFound)



app.listen(PORT,(req,res)=>{
    console.log(`server started at http://localhost:${PORT}`)
})