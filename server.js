import express from 'express';
import productsManager from './data/fs/ProductManager.fs.js'

//servidor
const server = express();
const port = 8080;
const ready = () => {
    console.log(`Server listening on port ${port}`);
}

server.listen(port, ready)  

//middlewares
server.use(express.urlencoded({ extended: true }))

//router
//al inciar el server
server.get('/', async (req, res) => {
    try {
    return res.status(200).json({
      statusCode: 200,
      response: "CODER API",
    })    
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      response : "CODER API ERROR",
    })
  }
})
//todos los products
server.get('/api/products', async (req, res) => {
  try {
    const { category } = req.query
    const all = await productsManager.read(category);
    if (all.length !== 0) {
      return res.status(200).json({
        statusCode: 200,
        response : all
      })
    } else {
      return res.status(404).json({
        statusCode: 404,
        response: null,
        message: 'Products not found'

      })
    }
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      response: "CODER API ERROR"
    })
  }
})

//product especifico
server.get('/api/products/:pid', async (req, res) => {
  try {
    const {pid} = req.params
    const one =  await productsManager.readOne(pid)
    if (!one) {
      return res.status(404).json({
        statusCode: 404,
        response: null,
        message: 'Product not found'

      })
    }else {
      return res.status(200).json({
        statusCode: 200,
        response: one
      })
    }
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      response: "CODER API ERROR"
    })
  }
})