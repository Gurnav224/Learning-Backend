const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


async function connectDB(){
    try {
       await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
       console.log("connected to DB")
    } catch (error) {
        console.error("error while connecting to DB",error)
    }
}



connectDB()

const PORT = 3000;

const app = express();

app.use(bodyParser.json())

const ProductSchema = new mongoose.Schema({
    name:String,
    price:Number
})

const Product = mongoose.model('products',ProductSchema);

const CategorySchema = new mongoose.Schema({
    name:String,
    noOfProducts:Number
})

const Categories = mongoose.model('categories',CategorySchema);



app.get('/',(req,res)=>{
    res.send(`<h1>Server Started</h1>`)
})

app.get('/about',(req,res)=>{
    res.send(`<h1>This is an about page</h1>`)
})

app.post('/products',async (req,res)=>{
    console.log(req.body)
    const product = await Product.create(req.body);
    product.save()
   res.json({success:true})
})

app.get('/products',async (req,res)=>{
    const product = await Product.find();
    res.json(product)
})

app.get('/products/:id',async (req,res)=>{
    const {id} = req.params;
    console.log(id)
    const product = await Product.findById(id);
    res.json(product)
})

app.put('/products/:id', async (req,res)=>{
    const {id} = req.params;
    const {name,price} = await req.body;
    const product =await Product.findByIdAndUpdate(id,{name,price});
    res.json({product,success:true})
})

app.delete('/products/:id',async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.json({product,success:true})
})


// Categories

app.post('/categories', async(req,res)=>{
    try {
        const {name , noOfProducts} = req.body
        const categories = await Categories.create({name,noOfProducts});
        res.json({categories,success:true})
    } catch (error) {
        res.status(500).json({message:"categories not added"})
    }
})


app.get('/categories',async (req,res)=>{
    try {
        const categories = await Categories.find();
        res.json({categories, success:true})
        
    } catch (error) {
        res.status(500).json({message:"catgories not found"})
    }
})

app.get('/categories/:id',async (req, res)=>{
    try {
        const {id} = req.params;
        const category = await Categories.findByIdAndUpdate(id);
        res.json({category,success:true})
    } catch (error) {
        console.error("Error while categries by id ")
    }
})


app.listen(PORT,()=>{
    console.log(`server started at https://localhost:3000`)
})