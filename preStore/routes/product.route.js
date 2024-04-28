

const express = require("express");
const { Product } = require("../models/product.model");
const router = express.Router();

router.get('/',async(req,res)=>{
    try {
        const products = await Product.find({});
        res.json({products,success:true,message:"successful"})
    } catch (error) {
        res.status(404).json({ success: false, message: "Error while retrieving products", errorMessage: error.message })
    }
})

router.get('/:id',async (req,res)=>{
    const {id} = req.params;
    console.log(id)
    try {
        let product = await Product.findById(id);
        console.log(product)
         if(product){
            res.status(200).json({product,success:true,message:'successful'})
         }

        res.status(404).json({success:false,errorMessage:"The product ID sent has no product associated with it. Check and try again" })
    } catch (error) {
        res.status(500).json({success:false,message:'something went wrong',errorMessage:error.message})
    }
})


module.exports  = router;

