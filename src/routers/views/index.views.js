import { Router } from "express";
//import ProductManager from "../../data/fs/ProductManager.fs.js"
import productManager from "../../data/mongo/managers/ProductManager.db.js";
import users from "./users.views.js";
import products from "./products.view.js"

const viewsRouter = Router();
//vistas usuarios
viewsRouter.use("/users", users)
//vistas de productos
viewsRouter.use("/products", products)




viewsRouter.get("/", async (req, res, next) => {
  try {
    const all = await productManager.read();
    //pasar a objetos plano para poder renderizar
    return res.render("index", { title: "HOME", content: all  });
  } catch (error) {
    return next(error);
  }
});

export default viewsRouter;