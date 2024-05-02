
function notRouteFound(req,res,next){
    res.status(404).json({success:true,message:"the route you're looking for couldn't be found" })
}

module.exports = {notRouteFound}