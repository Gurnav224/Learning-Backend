const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()

const product = require('./routes/product.route.js');
const categories = require('./routes/category.route.js')
const Auth = require('./routes/auth.router.js');
const user = require('./routes/user.route.js');
const {authVerify} = require('./middlewares/auth-verify.middlewares.js')

const  PORT = process.env.PORT || 3000;

console.log(PORT)

const {initializeDBConnection} = require('./db/db.connect.js')


const app = express();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

initializeDBConnection()

app.use('/products',product);
app.use('/categories',categories)
app.use('/auth',Auth)
app.use('/user', authVerify,user)

app.get('/',(req,res)=>{
    res.json({success:true,message:'Hello prestore'})
});


app.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`)
})