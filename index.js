const express = require('express')
const cors = require('cors')
const { MongoClient } = require('mongodb');
const app = express()
const port = process.env.PORT||5000
const ObjectId=require('mongodb').ObjectId

//midlleware
app.use(cors())
app.use(express.json())

//Username: nasib803
//password: JtIdAROCpddQrDNb

const uri = "mongodb+srv://nasib803:JtIdAROCpddQrDNb@cluster0.bo1xe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    const database = client.db("database");
    const haiku = database.collection("my_data");
    
      
      //post method

      app.post('/addproducts', async(req, res) => {
        console.log(req.body)
        const result = await haiku.insertOne(req.body)
        console.log(result)
          res.send(result.insertedId)
      })
    
    app.get('/products', async(req, res) => {
      const result = await haiku.find({}).toArray()
      res.send(result)
      })
      
    app.delete('/deleteProduct/:id', async(req, res) => {
      console.log(req.params.id)

      const result = await haiku.deleteOne({ _id: ObjectId(req.params.id) })
      console.log(result)
      res.send(result)
      
    })
    

    //update
    app.get('/update/:id', async(req, res) => {
      console.log(req.params.id)
      const result = await haiku.findOne({ _id: ObjectId(req.params.id) })
     res.send(result)
     
    })
    
    
    
    
    
    
    
    
    
    
    
    
      
      
    
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    console.log('succesfull')
    res.send('sends')
})









app.listen(port, () => {
    console.log('listining succesfull')
})