

const productId = (req,res,next)=>{
    const {id}= req.params;

    if(/^\d*$/.test(id)){
        console.log("right")
    }
    else{
        console.log("wrong")
    }

    next()
}

module.exports = productId;
