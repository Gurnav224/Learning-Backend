import express from "express"

const Router = express.Router();

let idCounter = 234;
const categories = [
    { id: 1, name: "Category 1", noOfProducts: 8 },
    { id: 2, name: "Category 2", noOfProducts: 5 },
  ]


  Router.route("/").get(async(req,res)=>{
    try {
        return res.json({ categories })
    } catch (error) {
        return res.status(500).json({error:'server internals error'})
    }
  })
  .post((req,res)=>{
    const {name,noOfProducts} = req.body;
    const category = {id:idCounter++,name:name,noOfProducts:noOfProducts};
    console.log(category)
    categories.push(category);
    res.json(category)
  })


  Router.route('/:id')
  .get(async(req,res)=>{
    const {id}  = req.params;
    const category = categories.find((item)=>item.id===parseInt(id,10));
    res.json({category,success:true})
  })


  export default Router;