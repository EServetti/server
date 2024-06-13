import { Router } from "express";
import exist from "../../middlewares/userExist.js";
import CartManager from "../../DAO/mongo/managers/CartManager.db.js";
import CustomRouter from "../customRouter.js";
import {read, paginate, readOne, create, update, destroy, desAll } from "../../controllers/api/controller.api.carts.js";

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




const cartsRouter = new CartsRouter();
export default cartsRouter.getRouter();
