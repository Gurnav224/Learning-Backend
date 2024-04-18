const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");



const uri = 'mongodb://127.0.0.1:27017/studnents';
const PORT = 4000
const app = express();

app.use(cors())
app.use(express.json())

const TaskSchema = new mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
})

const Tasks = mongoose.model('tasks',TaskSchema)


async function connectDB(){
    try {
        await  mongoose.connect(uri)
        console.log("connected to mongodb")
    } catch (error) {
        console.error("error while connecting to database",error)
    }
}

connectDB()



app.get('/', (req,res)=>{
    res.send('<h1>server started </h1>')
})

app.get('/students',async (req,res)=>{
    try {
        const students = await Tasks.find({})
        res.send(students)
    } catch (error) {
        console.error("error while getting getting all students",error)
    }
})


app.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`)
})