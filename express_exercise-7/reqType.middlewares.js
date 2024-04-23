


const reqType = (req,res,next)=>{
    if(req.method ==="GET"){
        console.log("Request type is GET")
    }
    else if(req.method==="POST"){
        console.log("Request Type is POST")
    }

    console.log(req.url)
    next()
}


module.exports =  reqType;

    