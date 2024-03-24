import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const PORT = 3000;
const app = express();

app.use(bodyParser.json());

app.use(cors())

let idCounter  =234
// This would come from a DB
const products = [
  { id: 123, name: "japani joota", price: 1200 },
  { id: 124, name: "jalebi", price: 500 },
];

app.get("/", (req, res) => {
  return res.json("server started");
});

app.get("/products", (req, res) => {
  return res.json({ products, success: true });
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const product = products.find((product) => product.id == parseInt(id, 10));
  console.log(product);
  if (product) {
    return res.json({ product });
  }
  res
    .status(404)
    .json({
      success: false,
      message:
        "The product ID sent has no product associated with it. Check and try again",
    });
});

app.post('/products',(req,res)=>{
    const {name,price} = req.body;

    // this will happen on db;
    const product = {id:idCounter++,name,price};

    products.push(product)

  return  res.json({success:true,product})
})


app.post('/products/:id',(req,res)=>{
    const {id} = req.params;

    const updateProduct = req.body;

    // temp code will replace by db
    products.forEach(product=>{
        if(product.id===parseInt(id,10)){
            Object.keys(updateProduct).forEach(key=>{
                if(key in product){
                    product[key] = updateProduct[key]
                }
            })
        }
    })

    res.json({products,success:true})
})

app.listen(PORT, () => {
  console.log(`server started at http://localhost:3000//${PORT}`);
});
