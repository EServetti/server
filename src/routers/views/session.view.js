import { Router } from "express";
import isValidUser from "../../middlewares/isValidUser.mid.js";
import userManager from "../../data/mongo/managers/UserManager.db.js";
import passport from "../../middlewares/passport.mid.js";
import { signedCookie } from "cookie-parser";
import passportCb from "../../middlewares/passportCollback.js"

const sessionRouter = new Router();

//ruta para logear/registrar con Google
sessionRouter.get("/google", passport.authenticate("Google", { scope: ["email", "profile"]}))
sessionRouter.get(
 "/google/callback",
 passport.authenticate("Google", {session: false}),
 (req, res, next) => {
   try {
     return res.cookie("token", req.user.token, {signedCookie: true, maxAge: 3600000}).redirect("/")
   } catch (error) {
     return next(error);
   }
 }
);


export default sessionRouter;
