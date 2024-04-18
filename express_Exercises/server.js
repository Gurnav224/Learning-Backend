// import express from the module
import express from "express";

const PORT = 3000;



// taking app out from the express (app is your server);
const app = express();


// Middleware to parse JSON requests
app.use(express.json())
// type of app method
// app.METHOD -> HTTP Method
// app.get => get the data from the server;
// app.post => add the data to the server;
// app.put => to update existing Item;
// app.delete => to delete a specific data by id
let id = 3;
// Sample data (you would normally use a database)
let items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ];
  

app.get('/',(req,res)=>{
     res.json({message:'server started'})
})

// Get - operation
app.get('/items',(req,res)=>{
    
  res.json({items})
})


// post-operation

app.post('/items',(req,res)=>{
    const {name,price} = req.body;
    let newItem = {id:id++,name,price};
    items.push(newItem)
    res.json(newItem)
})

// get-by id
app.get('/items/:id',(req,res)=>{
    const {id} = req.params;
    const item = items.find(i=>i.id===parseInt(id,10));
    console.log(id)
    res.json(item)
})


app.put('/items/:id',(req,res)=>{
    const itemId = parseInt(req.params.id);

    const updatedItems = req.body;

    items = items.map((item)=>{
        if(item.id===itemId){
            return {...item,...updatedItems}
        }
        return item
    })
    res.json({ message: 'Item updated' });
})

app.delete('/items/:id',(req,res)=>{
    const {id} = parseInt(req.params.id);
    items = items.filter(item=>item.id!==id);
    res.json({message:'Delete'})
})

app.listen(PORT,()=>{
    console.log(`Server started at https://localhost/${PORT}`)
})