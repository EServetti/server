import { Router } from "express";
import { verifyToken } from "../utils/jwt.js";
import { readByEmailService } from "../service/users.api.service.js";
import logger from "../utils/winston.js";

class CustomRouter {
  //para construir y configurar cada instancia del enrutador
  constructor() {
    this.router = Router();
    this.init();
  }
  //para obtener todas las rutas del enrutador definido
  getRouter() {
    return this.router;
  }
  //para inicializar las clases/propiedades heredades (sub-routers)
  init() {}
  //para manejar las callbacks (de middlewares y la final)
  applyCbs(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        return params[2](error);
      }
    });
  }
  response = (req, res, next) => {
    res.message200 = (message) => res.json({ statusCode: 200, message });
    res.paginate = (message, info) =>
      res.json({ statusCode: 200, message, info });
    res.message201 = (message) => res.json({ statusCode: 201, message });
    res.error400 = (message) => {
      const errorMessage = `${req.method} - ${req.url} - 400 - message: ${message} - ${new Date().toLocaleDateString()}`
      logger.ERROR(errorMessage)
      res.json({ statusCode: 400, message });}
    res.error401 = () =>{
      const errorMessage = `${req.method} - ${req.url} - 401 - message: "Bad auth from poliecies!" - ${new Date().toLocaleDateString()}`
      logger.ERROR(errorMessage)
      res.json({ statusCode: 401, message: "Bad auth from poliecies!" });}
    res.error403 = () =>{
      const errorMessage = `${req.method} - ${req.url} - 403 - message: "Forbidden from poliecies!" - ${new Date().toLocaleDateString()}`
      logger.ERROR(errorMessage)
      res.json({ statusCode: 403, message: "Forbidden from poliecies!" });}
    res.error404 = () => {
      const errorMessage = `${req.method} - ${req.url} - 404 - message: "Not found docs" - ${new Date().toLocaleDateString()}`
      logger.ERROR(errorMessage)
      res.json({ statusCode: 404, message: "Not found docs" });}
    return next();
  };
  policies = (policies) => async (req, res, next) => {
    if (policies.includes("PUBLIC")) return next();
    else {
      let token = req.cookies["token"];
      if (!token) {
        return res.error401();
      } else {
        try {
          token = verifyToken(token);
          const { role, email } = token;
          if (
            (policies.includes("USER") && role === "user") ||
            (policies.includes("PREMIUM") && role === "premium") ||
            (policies.includes("ADMIN") && role === "admin") 
          ) {
            const user = await readByEmailService(email);
            req.user = user;
            return next();
          } else return res.error403();
        } catch (error) {
          return res.error400(error.message);
        }
      }
    }
  };
  //create("/products", isValidAdmin, isText, create)
  create(path, arrayOfPolicies, ...callbacks) {
    this.router.post(
      path,
      this.response,
      this.policies(arrayOfPolicies),
      this.applyCbs(callbacks)
    );
  }
  read(path, arrayOfPolicies, ...callbacks) {
    this.router.get(
      path,
      this.response,
      this.policies(arrayOfPolicies),
      this.applyCbs(callbacks)
    );
  }
  update(path, arrayOfPolicies, ...callbacks) {
    this.router.put(
      path,
      this.response,
      this.policies(arrayOfPolicies),
      this.applyCbs(callbacks)
    );
  }
  destroy(path, arrayOfPolicies, ...callbacks) {
    this.router.delete(
      path,
      this.response,
      this.policies(arrayOfPolicies),
      this.applyCbs(callbacks)
    );
  }
  use(path, ...callbacks) {
    this.router.use(path, this.response, this.applyCbs(callbacks));
  }
}

export default CustomRouter;