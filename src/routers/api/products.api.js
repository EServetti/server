import { Router } from "express";
import productManager from "../../data/fs/ProductManager.fs.js";

const productsRouter = Router();

productsRouter.get("/", read);
productsRouter.get("/:nid", readOne);
productsRouter.post("/", create);
productsRouter.put("/:nid", update);
productsRouter.delete("/:nid", destroy);

//metodo read
async function read(req, res, next) {
  try {
    const { category } = req.query;
    const all = await productManager.read();
    const allCat = all.filter((product) => product.category === category)
    //si existen productos con la category ingresada los devuelve
    if (allCat.length !== 0 ) {
      return res.json({
        statusCode: 200,
        message: allCat,
      })}
    //sino se ingreso una query devuelve todos los productos
    else if (!category){
      return res.json({
        statusCode: 200,
        message: all,
      });
    } 
    //si no existe la query ingresada devuelve un error
    else {
      const error = new Error('Not found!')
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error)
  }
}
//metodo readOne
async function readOne(req, res, next) {
  try {
    const { nid } = req.params;
    const one = await productManager.readOne(nid);
    return res.json({
      statusCode: 200,
      message: one,
    });
  } catch (error) {
    return next(error)
  }
}
//metodo create
async function create(req, res, next) {
  try {
    const data = req.body;
    const created = await productManager.create(data);
    return res.json({
      statusCode: 201,
      message: `Created product id = ${created.id}`,
    });
  } catch (error) {
    return next(error)
  }
}
//metodo update
async function update(req, res, next) {
try {
  const { nid } = req.params;
  const data = req.body;
  const updated = await productManager.update(nid, data);
  return res.json({
    statusCode: 200,
    message: updated
  })
} catch (error) {
  return next(error);
}
}
//metodo destroy
async function destroy (req, res, next) {
  try {
    const { nid } = req.params;
    const eliminated = await productManager.destroy(nid)
    return res.json({
      statusCode: 200,
      message: `Eliminated product id: ${eliminated.id}`
    })
  } catch (error) {
    return next(error)
  }  
}
export default productsRouter;
