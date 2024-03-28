const express = require("express");
require('dotenv').config()
const {connectDB}  = require('./conn.js')
const bodyParser = require('body-parser')
const User = require('./userModel.js');





const app = express();

app.use(bodyParser.json())
app.use(express.json())


connectDB()
// add single user to the database
app.post('/user',async(req,res)=>{
    try {
        console.log(req.body);
        // Assuming User model is defined using Mongoose
        const user = new User(req.body)
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
})
// add multiple user to the database
app.post('/users',async (req,res)=>{
    try {
        const users = req.body;
        const saveData = await User.create(users);

        res.status(201).send(saveData)
    } catch (error) {
        res.status(400).send(error)
    }
})

// get multiple user from the database
app.get('/user',async(req,res)=>{
    try {
        const user = await User.find();
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

// get single user from the datbase

app.get('/user/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id)

        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

// update user

app.put('/user/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const userData = req.body;

        const user =await User.findByIdAndUpdate(id,userData,{new:true});
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

// sort user by name
app.get('/sort', async (req,res)=>{
    try {
        const sortBy = req.query.sortBy || 'name';
        const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1; // Default to ascending order
        // Use Mongoose sort method to sort data by the specified field and order
        const sortedData = await User.find().sort({ [sortBy]:sortOrder,age:1});


        res.status(200).send(sortedData)
    } catch (error) {
        res.status(500).send(error);
    }
})

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`)
})