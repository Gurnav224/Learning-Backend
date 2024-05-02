
const mongoose = require('mongoose');
const {Schema} = mongoose;


const CategorySchema = new Schema({
  name:{
    type:String,
    required:[true,'enter category type']
  },
  noOfProducts:{ 
    type:Number,
    required:[true,'enter noOfProducts']
  }
},
{
    timestamps:{currentTime:()=>Math.floor(Date.now/1000)}
}
)


const Category = mongoose.model('Category',CategorySchema);


module.exports = Category