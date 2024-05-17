import { Router } from "express";
import isValidUser from "../../middlewares/isValidUser.mid.js";
import userManager from "../../data/mongo/managers/UserManager.db.js";
import passport from "../../middlewares/passport.mid.js";

const sessionRouter = new Router();

//ruta para iniciar sesión
sessionRouter.post(
  "/login",
  isValidUser,
  passport.authenticate("login", { session: false }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "You're welcome ",
      });
    } catch (error) {
      return next(error);
    }
  }
);

//ruta que devuelve los datos del user
sessionRouter.get(
  "/",
  passport.authenticate("data", { session: false }),
  async (req, res, next) => {
    try {
      const one = req.body;
      res.json({
        statusCode: 200,
        message: one,
      });
    } catch (error) {
      return next(error);
    }
  }
);

sessionRouter.get("/signout", async (req, res, next) => {
  try {
    const online = req.session.email;
    if (online) {
      req.session.destroy();
      return res.json({
        statusCode: 200,
        message: "loged out!",
      });
    } else {
      const error = new Error("First log in!");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

export default sessionRouter;
