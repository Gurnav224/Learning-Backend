const mongoose = require('mongoose');
const url = process.env.MONGODB_URL;


async function initializeDBConnection(){
    try {
        const connectionStatus = await mongoose.connect(url)
        if(connectionStatus){
            console.log(`successfully connected to ${connectionStatus.connection.host}`)
          
        }
    } catch (error) {
        console.error('mongoose connection failed',error)
    }
}


module.exports = {initializeDBConnection}