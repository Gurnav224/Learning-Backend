

const reqType = (req,res,next)=>{
    if(req.method==="GET"){
        console.log('Request is GET')
    }
    else{
        console.log('Request is POST')
    }

    next()
}


module.exports = reqType