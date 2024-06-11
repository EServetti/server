import { Router } from "express";
import { read, create } from "../../controllers/views/controller.views.cart.js";
import isOnline from "../../middlewares/isOnline.js";

import CustomRouter from "../customRouter.js";


class CartsRouter extends CustomRouter {
init(){
  
this.read("/",["USER","ADMIN"], isOnline, read );

this.create("/",["USER","ADMIN"], create )
}
}


const carts = new CartsRouter();
export default carts.getRouter();
