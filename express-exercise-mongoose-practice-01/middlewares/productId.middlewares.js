
const productId = (req,res,next)=>{
    const {id} = req.params;

    if (/^\d*$/.test(id)) {
        console.log("Right");
      } else {
        console.log("Wrong");
      }
      next()
}

module.exports = productId