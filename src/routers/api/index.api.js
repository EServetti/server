import { Router } from "express";
import productsRouter from "./products.api.js";
import usersRouter from "./users.api.js";
import cartsRouter from "./carts.api.js";
import sessionRouter from "./session.api.js";
import CustomRouter from "../customRouter.js";
import ticketsRouter from "./tickets.api.js";

class ApiRouter extends CustomRouter {
  init() {
    this.use("/products", productsRouter);
    this.use("/users", usersRouter);
    this.use("/carts", cartsRouter);
    this.use("/sessions", sessionRouter);
    this.use("/tickets", ticketsRouter);
  }
}

const apiRouter = new ApiRouter();

export default apiRouter.getRouter();
