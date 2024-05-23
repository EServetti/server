import { Router } from "express";
import productManager from "../../data/mongo/managers/ProductManager.db.js"
import isOnline from "../../middlewares/isOnline.js"

const products = Router();

products.get("/real", isOnline, async (req, res, next) => {
  try {
    res.render("products-real", {title: "PRODUCTS REAL"})
  } catch (error) {
    return next(error);
  }
});

products.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params
    const one = await productManager.readOne(pid)
    //pasar a un objeto plano para poder renderizar
    res.render("productData", {title: "PRODUCT", product : one})
  } catch (error) {
    return next(error)
  }
})

export default products;
