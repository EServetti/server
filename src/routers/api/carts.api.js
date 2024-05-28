import { Router } from "express";
import exist from "../../middlewares/userExist.js";
import CartManager from "../../data/mongo/managers/CartManager.db.js";
import CustomRouter from "../customRouter.js";
import { verifyToken } from "../../utils/jwt.js";



class CartsRouter extends CustomRouter {
  init() {
    this.read("/",["USER","ADMIN"], read);
    this.read("/paginate",["USER","ADMIN"], paginate);
    this.read("/:nid",["USER","ADMIN"], readOne);
    this.create("/",["USER","ADMIN"], exist, create);
    this.update("/:nid",["USER","ADMIN"], update);
    this.destroy("/:nid",["USER","ADMIN"], destroy);   
  }
}







//metodo read
async function read(req, res, next) {
  try {
    const { user } = req.query
    const all = await CartManager.read();
    const allUser = all.filter((cart) => cart.user_id._id == user)
    //si existen carritos con el user_id ingresado los devuelve
    if (allUser.length !== 0 ) {
      return res.message200(allUser)}
    //sino se ingreso una query devuelve todos los carritos
    else if (!user){
      return res.message200(all);
    } 
    //si no existe un carrito con ese user_id devuelve error
    else {
      return res.error404()
    }
  } catch (error) {
    return next(error)
  }
}
//metodo paginate
async function paginate (req, res, next) {
  try {
    const { user } = req.query;
    const filter = {}
    const opts = {}
    if(user) {
      filter.user_id= user
    }
    const all = await CartManager.paginate(filter, opts)
    const info = {
      page: all.page,
      prevPage: all.prevPage,
      nextPage: all.nextPage,
      totalPages: all.totalPages
    }
    res.paginate(all, info)
  } catch (error) {
    return next(error)
  }
}
//metodo readOne
async function readOne(req, res, next) {
  try {
    const { nid } = req.params;
    const one = await CartManager.readOne(nid);
    if(!one){
      return res.error404()
    }
    return res.message200(one);
  } catch (error) {
    return next(error)
  }
}
//metodo create
async function create(req, res, next) {
  try {
    const data = req.body;
    const token = verifyToken(req.cookies.token)
    data.user_id = token._id
    if(Object.keys(data).length === 0) {
      return res.error400("You must enter at least quantity and product_id!")
    }
    const created = await CartManager.create(data);
    return res.message200("The product has been added to cart");
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
  const updated = await CartManager.update(nid, data);
  if(!updated) {
    return res.error404()
  }
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
    const eliminated = await CartManager.destroy(nid)
    console.log(eliminated);
    return res.message200(`The product has been eliminated of the cart!`)
  } catch (error) {
    return next(error)
  }  
}

const cartsRouter = new CartsRouter()
export default cartsRouter.getRouter();


