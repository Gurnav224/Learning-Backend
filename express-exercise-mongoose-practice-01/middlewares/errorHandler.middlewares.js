
function errorHandler(err,req,res,next){
    console.log(err.stack);
    res.status(500).json({success:true,errorMessage:err.message})
}


module.exports = {errorHandler}