import { Router } from "express";
import CustomRouter from "../customRouter.js";
import {read, paginate, readOne, create, update, destroy, desAll } from "../../controllers/api/controller.api.carts.js";
import validator from "../../middlewares/joi.validator.js"
import { cartValidator, UpdateCartValidator } from "../../schemas/carts.validator.js";
import hasStock from "../../middlewares/hasStock.js";
import hasEnoughStock from "../../middlewares/hasEnoughStock.js";

class CartsRouter extends CustomRouter {
  init() {
    this.read("/", ["ADMIN"], read);
    this.read("/paginate", ["ADMIN"], paginate);
    this.read("/:nid", ["ADMIN"], readOne);
    this.create("/", ["USER","PREMIUM", "ADMIN"], validator(cartValidator), create);
    this.update("/:nid", ["USER","PREMIUM", "ADMIN"], validator(UpdateCartValidator), update);
    this.destroy("/all", ["USER","PREMIUM", "ADMIN"], desAll);
    this.destroy("/:nid", ["USER","PREMIUM", "ADMIN"], destroy);
  }
}




const cartsRouter = new CartsRouter();
export default cartsRouter.getRouter();
