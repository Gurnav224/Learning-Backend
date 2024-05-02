
const mongoose = require('mongoose');
const {Schema} = mongoose;

const CategorySchema =  new Schema({
    name:{
        type:String,
        required:[true,'please add you category']
    },
    noOfProducts:{
        type:String,
        required:[true,'please add your noOfProducts']
    }
})


const Category = mongoose.model('Category',CategorySchema);

module.exports = {Category}