import { Router } from "express";
import productManager from "../../data/mongo/managers/ProductManager.db.js"
import isOnline from "../../middlewares/isOnline.js"
import CustomRouter from "../customRouter.js";

class ProductsRouter extends CustomRouter {
  init(){
    this.read("/real", ["ADMIN"], isOnline, async (req, res, next) => {
      try {
        res.render("products-real", {title: "PRODUCTS REAL"})
      } catch (error) {
        return next(error);
      }
    });
    
    this.read("/:pid", ["PUBLIC"], async (req, res, next) => {
      try {
        const { pid } = req.params
        const one = await productManager.readOne(pid)
        //pasar a un objeto plano para poder renderizar
        res.render("productData", {title: "PRODUCT", product : one})
      } catch (error) {
        return next(error)
      }
    })
    
  }
}



const products = new ProductsRouter();
export default products.getRouter();
