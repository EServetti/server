import { Router } from "express";
import userManager from "../../data/mongo/managers/UserManager.db.js";
import isValidUser from "../../middlewares/isValidUser.mid.js";
import passport from "../../middlewares/passport.mid.js";
import isValidData from "../../middlewares/isValidData.js";
import { token } from "morgan";
import passportCb from "../../middlewares/passportCollback.js"
import CustomRouter from "../customRouter.js";

class SessionRouter extends CustomRouter {
  init(){
//ruta de register
this.create(
  "/register",
  ["PUBLIC"],
  isValidData,
  passportCb("register"),
  async (req, res, next) => {
    try {
      return res.message201("The account has been created!");
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
);

//ruta de login
this.create(
  "/login",
  ["PUBLIC"],
  isValidUser,
  passportCb("login"),
  async (req, res, next) => {
    try {
      return res.cookie("token", req.user.token, { signedCookie: true, maxAge:3600000 }).message200("You're welcome!");
    } catch (error) {
      return next(error);
    }
  }
);

//ruta para ver datos del user online
this.create(
  "/",
  ["USER","ADMIN"],
  passportCb("data"),
  async (req, res, next) => {
    try {
      const one = req.body;
      res.message200(one);
    } catch (error) {
      return next(error);
    }
  }
);

//ruta de log out
this.create("/signout",
["USER","ADMIN"],
async (req, res, next) => {
  try {
    const online = req.cookies.token;
      res.clearCookie("token")
      return res.message200("Loged out!");
  } catch (error) {
    return next(error);
  }
});
  }
}



const sessionRouter = new SessionRouter();
export default sessionRouter.getRouter();
