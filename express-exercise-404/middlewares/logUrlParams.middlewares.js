

const logParams = (req,res,next)=>{
    const {id}= req.params;

    if(id){
        console.log("log Id",id)
    }
    next()
}

module.exports = logParams;

