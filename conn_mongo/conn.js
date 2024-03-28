const mongoose = require('mongoose');


async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connect to database")
    } catch (error) {
        console.error('error while connecting to error',error)
    }
}

module.exports = {connectDB}