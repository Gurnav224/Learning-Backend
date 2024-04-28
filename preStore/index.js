const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()

const product = require('./routes/product.route.js');
const categories = require('./routes/category.route.js')


const  PORT = process.env.PORT || 3000;

console.log(PORT)

const {initializeDBConnection} = require('./db/db.connect.js')


const app = express();


app.use(bodyParser.json())
app.use(cors())

initializeDBConnection()

app.use('/products',product);
app.use('/categories',categories)

app.get('/',(req,res)=>{
    res.json({success:true,message:'Hello prestore'})
});


app.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`)
})