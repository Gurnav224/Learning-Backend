

const productId = (req,res,next)=>{
    const {id} = req.params;

    if(/^\*$/.test(id)){
        console.log("right")
    }
    else{
        console.log("wrong")
    }
}

module.exports = {productId}