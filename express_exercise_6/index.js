
const express = require("express");
const bodyParser = require("body-parser");
const productV1 = require("./product.route");
const categories = require('./category.route')

const PORT = 3000;

const app = express();
app.use(bodyParser.json())


app.use('/v1/products',productV1);
app.use('/category',categories);


app.get('/',(req,res)=>{
    res.send('Hello world!')
})

app.get('/about',(req,res)=>{
    res.send('<h3>This is about page</h3>')
})


app.listen(PORT,()=>{
    console.log(`server started http://localhost:${PORT}`)
})