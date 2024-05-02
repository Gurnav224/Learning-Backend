

function errorHandler(err,req,res,next){
    console.log(err.stack);
    res.status(500).json({
        success:true,
        message:"Errored occured see the error message formore details"
    })
}

module.exports = {errorHandler}