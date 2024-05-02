const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const {initializeDBConnection} = require('./db/db.connect')

initializeDBConnection()

const app = express();

app.use(cors());
app.use(bodyParser.json());
const productId = require('./middlewares/productId.middlewares.js');
const reqType  = require('./middlewares/reqType.middlewares.js')
const logParams = require('./middlewares/logParams.middlewares.js');
const {errorHandler} = require('./middlewares/errorHandler.middlewares.js');
const {notRouteFound} = require('./middlewares/routeNotFound.middlewares.js');

app.use('/products/:id',productId);
app.use(logParams)
app.use(reqType)

const category = require('./routes/category.route.js');
const product = require('./routes/product.route.js');

app.use('/category',category)
app.use('/products',product);


app.use(errorHandler);
app.use(notRouteFound);

app.get('/',(req,res)=>{
    res.send('<h1>Server Started </h1>')
})

app.get('/about',(req,res)=>{
    res.send('<h1>This is about page </h1>')
})

app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`)
})