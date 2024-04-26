

function errorHandler(err,req,res,next){
    console.error(err.stack);
    res.status(500).json({
        success:false,
     message: "Error occured see the error message formore details", errorMessage: err.message 
    })
}


module.exports = {errorHandler}