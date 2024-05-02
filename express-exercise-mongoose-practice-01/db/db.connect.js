const mongoose = require('mongoose');

const uri = process.env.MONGO_DB;

async function initializeDBConnection(){
    try {
        const connections = await mongoose.connect(uri);
        if(connections){
            console.log(`connected to mongodb successfully : ${connections.connection.host}`)
        }
    } catch (error) {
        console.error('error while connecting to database: ',error.message)
    }
}


module.exports = {initializeDBConnection};
