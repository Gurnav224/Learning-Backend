

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
}).post((req, res) => {
    const { name, price } = req.body;
    const newProduct = { name, price, id: counterId++ };
    products.push(newProduct);
    res.status(201).json({ newProduct, success: true });
});


// nobody sends password in the url this is just to show, do not do this.

const authCheck = ((req,res,next)=>{
    const {name, password} = req.query;
    // console.log(name,password);

    if(name==='prena' && password==="helloworld"){
        const user = {name:"admin" ,password:'admin'}
        req.user = user;
        next()
    }
    else{
        res.status(201).json({success:false,message:'betaji password leke aao'})
    }
})

const checkId = ((req,res,next)=>{
    console.log('params',req.params);
    req['paramsChecked'] = true ;
    next()
})


router.use('/:id',authCheck)
router.use('/:id',checkId)

router.route('/:id').get((req,res)=>{
    const {id}= req.params;
    const product = products.find((product)=>product.id==id);
    res.json({product,success:true})
})
.post((req,res)=>{
    const {id} = req.params;
    const updatedProduct = req.body;

    products.forEach((product)=>{
        if(product.id===parseInt(id,10)){
            Object.keys(updatedProduct).forEach((key)=>{
                product[key] = updatedProduct[key]
            })
        }
    })

    res.json({products,success:true})
})
.delete((req,res)=>{
    const {id} = req.params;
    const productIndex = products.findIndex((product)=>product.id===parseInt(id,10));

    if(productIndex!==-1){
        products.splice(productIndex,1);
        res.json({products,success:true,message:"product delete successfully"})
    }
    
    res.status(404).json({success:false,message:'the product id requested doesn"t exits'})
})

module.exports = router;