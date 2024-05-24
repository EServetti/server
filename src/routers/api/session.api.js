import { Router } from "express";
import userManager from "../../data/mongo/managers/UserManager.db.js";
import isValidUser from "../../middlewares/isValidUser.mid.js";
import passport from "../../middlewares/passport.mid.js";
import isValidData from "../../middlewares/isValidData.js";
import { token } from "morgan";
import passportCb from "../../middlewares/passportCollback.js"

const sessionRouter = Router();

//ruta de register
sessionRouter.post(
  "/register",
  isValidData,
  passportCb("register"),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 201,
        message: "The acount has been created!",
      });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
);

//ruta de login
sessionRouter.post(
  "/login",
  isValidUser,
  passportCb("login"),
  async (req, res, next) => {
    try {
      return res.cookie("token", req.user.token, { signedCookie: true }).json({
        statusCode: 200,
        message: "You're welcome ",
      });
    } catch (error) {
      return next(error);
    }
  }
);

//ruta para ver datos del user online
sessionRouter.post(
  "/",
  passportCb("data"),
  async (req, res, next) => {
    try {
      const one = req.body;
      res.json({
        statusCode: 200,
        message: one
      });
    } catch (error) {
      return next(error);
    }
  }
);

//ruta de log out
sessionRouter.post("/signout", async (req, res, next) => {
  try {
    const online = req.cookies.token;
    if (online) {
      res.clearCookie("token")
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
