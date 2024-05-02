
const reqType = (req,res , next)=>{
    if(req.method === 'GET'){
        console.log(`Request Type is GET`)
    }
    else{
        console.log(`Request Type is POST`)
    }
    console.log(req.url)
    next()
}

module.exports = reqType;