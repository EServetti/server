import { Router } from "express";
import isValidUser from "../../middlewares/isValidUser.mid.js";
import userManager from "../../data/mongo/managers/UserManager.db.js";
import passport from "../../middlewares/passport.mid.js";
import { signedCookie } from "cookie-parser";
import passportCb from "../../middlewares/passportCollback.js";
import CustomRouter from "../customRouter.js";

class SessionRouter extends CustomRouter {
  init() {
    //ruta para logear/registrar con Google
    this.read(
      "/google",
      ["PUBLIC"],
      passport.authenticate("Google", { scope: ["email", "profile"] })
    );
    this.read(
      "/google/callback",
      ["PUBLIC"],
      passport.authenticate("Google", { session: false }),
      (req, res, next) => {
        try {
          return res
            .cookie("token", req.user.token, {
              signedCookie: true,
              maxAge: 3600000,
            })
            .redirect("/");
        } catch (error) {
          return next(error);
        }
      }
    );
  }
}

const sessionRouter = new SessionRouter();
export default sessionRouter.getRouter();
