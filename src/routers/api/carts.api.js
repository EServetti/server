import { Router } from "express";
import exist from "../../middlewares/userExist.js";
import CartManager from "../../DAO/mongo/managers/CartManager.db.js";
import CustomRouter from "../customRouter.js";
import { paginate, readOne, create, update, destroy, desAll } from "../../controllers/api/controller.api.carts.js";

class CartsRouter extends CustomRouter {
  init() {
    this.read("/", ["USER", "ADMIN"], read);
    this.read("/paginate", ["USER", "ADMIN"], paginate);
    this.read("/:nid", ["USER", "ADMIN"], readOne);
    this.create("/", ["USER", "ADMIN"], exist, create);
    this.update("/:nid", ["USER", "ADMIN"], update);
    this.destroy("/all", ["USER","PUBLIC"], desAll);
    this.destroy("/:nid", ["USER", "ADMIN"], destroy);
  }
}

//metodo read
async function read(req, res, next) {
  try {
    const { user } = req.query;
    const all = await CartManager.read();
    const allUser = all.filter((cart) => cart.user_id._id == user);
    //si existen carritos con el user_id ingresado los devuelve
    if (allUser.length !== 0) {
      return res.message200(allUser);
    }
    //sino se ingreso una query devuelve todos los carritos
    else if (!user) {
      return res.message200(all);
    }
    //si no existe un carrito con ese user_id devuelve error
    else {
      return res.error404();
    }
  } catch (error) {
    return next(error);
  }
}


const cartsRouter = new CartsRouter();
export default cartsRouter.getRouter();
