import { Router } from "express";
import ProductManager from "../../data/fs/ProductManager.fs.js"
import register from "./register.view.js";
import login from "./login.views.js"
import userData from "./userData.views.js"

const viewsRouter = Router();
viewsRouter.use(register)
viewsRouter.use(login)
viewsRouter.use(userData)

viewsRouter.get("/", async (req, res, next) => {
  try {
    const all = await ProductManager.read();
    return res.render("index", { title: "HOME", content: all  });
  } catch (error) {
    return next(error);
  }
});

export default viewsRouter;