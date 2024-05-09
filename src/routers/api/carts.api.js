import { Router } from "express";
import exist from "../../middlewares/userExist.js";
import CartManager from "../../data/mongo/managers/CartManager.db.js";


const cartsRouter = Router();


cartsRouter.get("/", read);
cartsRouter.get("/paginate", paginate);
cartsRouter.get("/:nid", readOne);
cartsRouter.post("/", exist, create);
cartsRouter.put("/:nid", update);
cartsRouter.delete("/:nid", destroy);

//metodo read
async function read(req, res, next) {
  try {
    const { user } = req.query
    const all = await CartManager.read();
    const allUser = all.filter((cart) => cart.user_id._id == user)
    //si existen carritos con el user_id ingresado los devuelve
    if (allUser.length !== 0 ) {
      return res.json({
        statusCode: 200,
        message: allUser,
      })}
    //sino se ingreso una query devuelve todos los carritos
    else if (!user){
      return res.json({
        statusCode: 200,
        message: all,
      });
    } 
    //si no existe un carrito con ese user_id devuelve todos
    else {
      const error = new Error('Not found!')
      error.statusCode = 404;
      throw error;
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
    res.json({
      statusCode: 200,
      message: all.docs,
      info: info
    })
  } catch (error) {
    return next(error)
  }
}
//metodo readOne
async function readOne(req, res, next) {
  try {
    const { nid } = req.params;
    const one = await CartManager.readOne(nid);
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
    const created = await CartManager.create(data);
    return res.json({
      statusCode: 201,
      message: `Created cart id = ${created.id}`,
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
  const updated = await CartManager.update(nid, data);
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
    const eliminated = await CartManager.destroy(nid)
    return res.json({
      statusCode: 200,
      message: `Eliminated cart id: ${eliminated.id}`
    })
  } catch (error) {
    return next(error)
  }  
}
export default cartsRouter;


