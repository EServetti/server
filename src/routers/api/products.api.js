import { Router } from "express";
//import productManager from "../../data/fs/ProductManager.fs.js";
import exist from "../../middlewares/productExist.js";
import { read, paginate, readOne, create, update, destroy } from "../../controllers/api/controller.api.products.js";
import CustomRouter from "../customRouter.js";
import titleExists from "../../middlewares/titleExists.js";
import validator from "../../middlewares/joi.validator.js";
import { productValidator, updateProductValidator } from "../../schemas/products.validator.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], read);
    this.read('/paginate', ["PUBLIC"], paginate)
    this.read("/:nid", ["PUBLIC"], readOne);
    this.create("/", ["PREMIUM","ADMIN"], validator(productValidator), exist, create,);
    //Crear middleware para que los user premium solo puedan editar y eliminar sus productos
    this.update("/:nid",["PREMIUM","ADMIN"], validator(updateProductValidator), titleExists, update);
    this.destroy("/:nid",["PREMIUM","ADMIN"], destroy);
  }
}


const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();
