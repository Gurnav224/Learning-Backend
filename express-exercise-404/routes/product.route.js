const express = require("express");
const router = express.Router();

// This would come from a DB
let counterId = 125;
const products = [
  { id: 123, name: "japani joota", price: 1200 },
  { id: 124, name: "jalebi", price: 500 }
]

router.route('/').get((req,res)=>{
    res.json({products,success:true})
})
.post((req,res)=>{
    const {name, price} = req.body;

    const newProduct = {name,price,id:counterId++};

    products.push(newProduct)

    res.json({newProduct,success:true})
})


const authCheck = (req,res,next)=>{
    const {name,password}= req.query;

    console.log(name,password);

    if(name==="prena" && password==="helloworld"){
        const user = {name:"admin",password:'helloworld'}
        req.user = user;
        next()
    }
    else{
        res.status(401).json({success:false,message:'betji password leke aao'})
    }
}


const checkId = (req,res,next)=>{
    console.log('params',req.params);
    req['paramaChecked']=true;
    next()
}

router.use('/:id',checkId)

router.use('/:id',authCheck)

router.route('/:id')
.get((req,res)=>{
    const {id} = req.params;
    const product = products.find((product)=>product.id==id);

    res.json({product,success:true})
})
.post((req,res)=>{
   
})


module.exports = router;

