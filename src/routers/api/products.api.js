import { Router } from "express";
//import productManager from "../../data/fs/ProductManager.fs.js";
import isPhoto from "../../middlewares/isPhoto.js"
import uploader from "../../middlewares/multer.mid.js";
import exist from "../../middlewares/productExist.js";
import productManager from "../../data/mongo/managers/ProductManager.db.js";
import CustomRouter from "../customRouter.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], read);
    this.read('/paginate', ["PUBLIC"], paginate)
    this.read("/:nid", ["PUBLIC"], readOne);
    this.create("/", ["ADMIN"],uploader.single("photo"),exist,isPhoto, create,);
    this.update("/:nid",["ADMIN"], update);
    this.destroy("/:nid",["ADMIN"], destroy);
  }
}




//metodo read
async function read(req, res, next) {
  try {
    const { category } = req.query;
    const all = await productManager.read();
    const allCat = all.filter((product) => product.category === category)
    //si existen productos con la category ingresada los devuelve
    if (allCat.length !== 0 ) {
      return res.message200(allCat)
    }
    //sino se ingreso una query devuelve todos los productos
    else if (!category){
      return res.message200(all)
    } 
    //si no existe la query ingresada devuelve un error
    else {
      return res.error404()
    }
  } catch (error) {
    return next(error)
  }
}
async function paginate(req, res, next) {
  try {
  const filter = {}
  const opts = {}
  if(req.query.limit) {
      opts.limit = req.query.limit;
  }
  if(req.query.page) {
    opts.page = req.query.page
  }
  const all = await productManager.paginate(filter, opts)
  const info = {
    page: all.page,
    totalPages: all.totalPages,
    prevPage: all.prevPage,
    nextPage: all.nextPage,
    maxPage: all.limit
  }
  return res.paginate(all, info)
  } catch (error) {
    return next(error)
  }
}
//metodo readOne
async function readOne(req, res, next) {
  try {
    const { nid } = req.params;
    const one = await productManager.readOne(nid);
    return res.message200(one)
  } catch (error) {
    return next(error)
  }
}
//metodo create
async function create(req, res, next) {
  try {
    const data = req.body;
    if(Object.keys(data).length === 0) {
      return res.error400("You must enter at least title of the product!")
    }
    const created = await productManager.create(data);
    return res.message201(`The product ${data.title} has been created!`)
  } catch (error) {
    return next(error)
  }
}
//metodo update
async function update(req, res, next) {
try {
  const { nid } = req.params;
  const data = req.body;
  if (Object.keys(data).length === 0 || nid === ":nid") {
    return res.error400("You must enter data and nid!");
  }
  const updated = await productManager.update(nid, data);
  return res.message200(updated)
} catch (error) {
  return next(error);
}
}
//metodo destroy
async function destroy (req, res, next) {
  try {
    const { nid } = req.params;
    if(nid === ":nid") {
      return res.error400("You must enter nid!")
    }
    const eliminated = await productManager.destroy(nid)
    return res.message200(`The product ${eliminated.title} has been eliminated!`)
  } catch (error) {
    return next(error)
  }  
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();
