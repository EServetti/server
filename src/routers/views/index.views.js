import { Router } from "express";
//import ProductManager from "../../data/fs/ProductManager.fs.js"
import users from "./users.views.js";
import sessionRouter from "./session.view.js";
import CustomRouter from "../customRouter.js";

class ViewsRouter extends CustomRouter {
  init() {
    this.use("/users", users);
    this.use("/session", sessionRouter);
  }
}

const viewsRouter = new ViewsRouter();
export default viewsRouter.getRouter();
