
const logParams = (req,res, next)=>{
    const {id} = req.params;
    if(id){
        console.log("id",id)
    }
    next()
}

module.exports = logParams;