import { Router } from "express";
import CustomRouter from "../customRouter.js";
import {read, paginate, readOne, create, update, destroy, desAll } from "../../controllers/api/controller.api.carts.js";
import validator from "../../middlewares/joi.validator.js"
import { cartValidator, UpdateCartValidator } from "../../schemas/carts.validator.js";

class CartsRouter extends CustomRouter {
  init() {
    this.read("/", ["USER", "ADMIN"], read);
    this.read("/paginate", ["USER", "ADMIN"], paginate);
    this.read("/:nid", ["USER", "ADMIN"], readOne);
    this.create("/", ["USER", "ADMIN"], validator(cartValidator), create);
    this.update("/:nid", ["USER", "ADMIN"], validator(UpdateCartValidator), update);
    this.destroy("/all", ["USER","ADMIN"], desAll);
    this.destroy("/:nid", ["USER", "ADMIN"], destroy);
  }
}




const cartsRouter = new CartsRouter();
export default cartsRouter.getRouter();
