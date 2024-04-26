import { Router } from "express";
import ProductManager from "../../data/fs/ProductManager.fs.js"
import users from "./users.views.js";
import products from "./products.view.js"

const viewsRouter = Router();
//vistas usuarios
viewsRouter.use("/users", users)
//vistas de productos
viewsRouter.use("/products", products)




viewsRouter.get("/landingpage", async (req, res, next) => {
  try {
    const all = await ProductManager.read();
    return res.render("index", { title: "HOME", content: all  });
  } catch (error) {
    return next(error);
  }
});

export default viewsRouter;