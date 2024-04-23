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
    const {name,price} = req.body;
    const newProduct = {name,price,id:counterId++};
    products.push(newProduct);
    res.json({products,success:true})
})


const authCheck = (req,res,next)=>{
 const {name,password} = req.query;
 console.log(name,password);

 if(name==='prena' && password==="helloworld"){
    const user = {name:"admin" ,password:"admin"};
    req.user = user;
    next()
 }
 else{
    res.status(401).json({success:false,message:"betaji password leke aao"})
 }
}


const checkId = (req,res,next)=>{
    console.log('params',req.params);
    req['paramsChecked'] = true;
    next()
}

router.use('/:id',checkId);
router.use('/:id',authCheck);

router.route('/:id')
.get((req,res)=>{
    const {id} = req.params;
    console.log(req.paramsChecked);
    const {name}= req.query;

    console.log(name)

    const product = products.find((product)=>product.id==id);

    if(product){
        return res.json({product,success:true,welcome:req.user.name})
    }
    res.json({product,success:true,welcome:req.user.name})
})
.post((req,res)=>{
    const {id}= req.params;
    const updatedProduct = req.body;

    products.forEach((product)=>{
        if(product.id==parseInt(id,10)){
            Object.keys(updatedProduct).forEach((key)=>{
                if(key in product){
                    product[key] = updatedProduct[key]
                }
            })
        }
    })
    res.json({products,success:true})
})
.delete((req,res)=>{
    const {id} = req.params;
    const product = products.find((item)=>item.id==id);
    console.log(product)
    if(product){
        var index = products.findIndex(function(item){
            return item.id === parseInt(id,10)
        })
        if(index!==-1){
            products.slice(index,-1)
            res.json({products,success:true,message:'successful',welcome:req.user.name})
        }
    }
    res.status(404).json({ succes: false, message: "The product id you requested doesn't exists" });
})

module.exports = router;