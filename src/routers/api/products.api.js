import { Router } from "express";
//import productManager from "../../data/fs/ProductManager.fs.js";
import exist from "../../middlewares/productExist.js";
import { read, paginate, readOne, create, update, destroy } from "../../controllers/api/controller.api.products.js";
import CustomRouter from "../customRouter.js";
import titleExists from "../../middlewares/titleExists.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], read);
    this.read('/paginate', ["PUBLIC"], paginate)
    this.read("/:nid", ["PUBLIC"], readOne);
    this.create("/", ["ADMIN"],exist, create,);
    this.update("/:nid",["ADMIN"], titleExists, update);
    this.destroy("/:nid",["ADMIN"], destroy);
  }
}


const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();
