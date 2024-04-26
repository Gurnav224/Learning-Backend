const express = require("express");

// This would come from a DB
let counterId = 125;
const products = [
  { id: 123, name: "japani joota", price: 1200 },
  { id: 124, name: "jalebi", price: 500 }
]

const router = express.Router()


router.route('/').get((req,res)=>{
    res.json({products,success:true})
})
.post((req,res)=>{
    const newProduct = req.body;
     products.push({...newProduct,id:counterId++});
     res.json({products,success:true})
})


const authCheck = (req,res,next)=>{
    const {name,password} = req.query;
    console.log(name,password)

    if(name==='prena' && password==='helloworld'){
        const user = {name:'admin',password:'admin'}

        req.user = user;

        next();
    }
    else{
        res.status(401).json({success:false,message:'betaji password leke aao'})
    }
}

const checkId = (req,res,next)=>{
    console.log('params',req.params);
    req['paramsChecked']= true;
    next()
}

router.use('/:id',checkId);

router.use('/:id',authCheck);

router.route('/:id')
.get((req,res)=>{
    const {id} = req.params;

    console.log(req.paramsChecked);

    const {name}= req.query;
    console.log(name);

    const product = products.find((product)=>product.id==id);
    res.json({product,success:true})
})
.post((req,res)=>{
    const {id} = req.params;
    const updatedCategory = req.body;
    products.forEach((product)=>{
        if(product.id===parseInt(id,10)){
            Object.keys((updatedCategory)).forEach((key)=>{
                product[key] = updatedCategory[key]
            })
        }
    })
    console.log()
    res.json({updatedCategory,success:true})
})

module.exports = router;