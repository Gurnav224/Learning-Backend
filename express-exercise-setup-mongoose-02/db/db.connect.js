const mongoose = require('mongoose');
const url = process.env.MONGO_URI

async function intializeDatabase(){
    try {
        const connection = await mongoose.connect(url);
        if(connection){
            console.log(`connected to database succesfully at ${connection.connection.host}`)
        }
    } catch (error) {
        console.error('Error while connecting to database',error)
    }
}

module.exports = {intializeDatabase}