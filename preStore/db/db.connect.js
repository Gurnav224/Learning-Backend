const mongoose = require("mongoose");
const URL = process.env.MONGODB_URL


async function initializeDBConnection(){
   try {
    const connection = await mongoose.connect(URL)
    if(connection){
        console.log(`successfully connected to ${connection.connection.host}`)
    }
   } catch (error) {
    console.error('mongoose connection error failed',error)
   }
}


module.exports = {initializeDBConnection}
