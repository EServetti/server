import { Router } from "express";
//import ProductManager from "../../data/fs/ProductManager.fs.js"
import productManager from "../../data/mongo/managers/ProductManager.db.js";
import users from "./users.views.js";
import products from "./products.view.js"
import carts from "./cart.view.js"
import sessionRouter from "./session.view.js";

const viewsRouter = Router();
//vistas usuarios
viewsRouter.use("/users", users)
//vistas de productos
viewsRouter.use("/products", products)
//vista de carrito
viewsRouter.use("/carts", carts)
//vista session
viewsRouter.use("/session", sessionRouter)




viewsRouter.get("/", async (req, res, next) => {
  try {
    const filter = {};
    const opts = {
      limit: 9
    }
    let category = "";
    if(req.query.category) {
      filter.category = req.query.category
      category = req.query.category
    }
    if(req.query.page) {
      opts.page = req.query.page
    }
    let all = await productManager.paginate(filter, opts);
    const info = {
      page: all.page,
      prevPage: all.prevPage,
      nextPage: all.nextPage,
      totalPages: all.totalPages,
      category:  category,
    }
    //los paso a JSON para poder ser leidos
    all = all.docs.map(doc => doc.toJSON())
    return res.render("index", { title: "HOME", content: all, info: info});
  } catch (error) {
    return next(error);
  }
});

export default viewsRouter;