

const logParams = (req,res,next)=>{
    const {id} = req.params;

    if(id){
        console.log(id)
    }
    console.log(req.url)
    next()
}


module.exports = logParams;
