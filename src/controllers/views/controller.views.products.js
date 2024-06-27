import { readOneService } from "../../service/products.api.service.js";

async function read (req, res, next)  {
    try {
      res.render("products-real", {title: "PRODUCTS REAL"})
    } catch (error) {
      return next(error);
    }
  }
  
  async function readOne (req, res, next) {
    try {
      const { pid } = req.params
      const one = await readOneService(pid)
      //pasar a un objeto plano para poder renderizar
      res.render("productData", {title: "PRODUCT", product : one})
    } catch (error) {
      return next(error)
    }
  }

export {read, readOne}