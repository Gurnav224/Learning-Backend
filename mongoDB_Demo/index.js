const mongo = require("mongodb");
const {MongoClient}  = require("mongodb")

const uri = 'mongodb://127.0.0.1:27017/studnents';


const client = new MongoClient(uri)

async function run(){
    try {
        await client.connect();
        const database = client.db('studnents');
        const products  = database.collection('tasks');
        const categories = database.collection('categories');

         // Add a document to products
         const newProduct = {title:'today codewars done',description:'solve 8-kyu codewars problem',completed:true};
         const result = await products.insertOne(newProduct);
          console.log(
               `${result.acknowledged} documents were inserted with the _id: ${result.insertedId}`,
             );

              // Query for a product that has the name 'japani joota'

              const query = { title: 'today codewars done'}
              const product = await products.findOne(query)
              console.log("found one",product)

              const allProduct = products.find();

              const allProducts = await allProduct.toArray(); // Convert cursor to array
            //   console.log("all products", allProducts);
    } 
    finally{
        await client.close()
    }
}


run().catch(console.dir)