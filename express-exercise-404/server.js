const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const productV1 = require('./routes/product.route');
const categories = require('./routes/category.route');

const PORT = 3000;

const app = express();

app.use(bodyParser.json())

app.use(cors())


const logUrlParams = require("./middlewares/logUrlParams.middlewares");

const productId = require("./middlewares/productId.middlewares")

const reqType = require('./middlewares/reqType.middlewares');

app.use(reqType)

app.use('/v1/products/:id',logUrlParams)


app.use('/v1/products',productV1)


app.use('/categories',categories)

app.get('/',(req,res)=>{
    res.send('hello , server started')
})

app.get('/about',(req,res)=>{
    res.send('this is about page')
})

app.use((req,res)=>{
    res.status(404).json({
        success:true,
        message:"Sorry this page is not avaliable"
    })
})

app.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`)
})