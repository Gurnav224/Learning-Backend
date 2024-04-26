


function routeNotFound(req,res,next){
    res.status(404).json({success:false,message:'the route your"re looking not found'})
}


module.exports = {routeNotFound}