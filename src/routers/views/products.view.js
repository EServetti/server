import { Router } from "express";
import { read, readOne } from "../../controllers/views/controller.views.products.js";
import isOnline from "../../middlewares/isOnline.js"
import CustomRouter from "../customRouter.js";

class ProductsRouter extends CustomRouter {
  init(){
    this.read("/real", ["ADMIN"], isOnline, read);
    
    this.read("/:pid", ["PUBLIC"], readOne )
    
  }
}

const products = new ProductsRouter();
export default products.getRouter();
