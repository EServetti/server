import { Router } from "express";
//import userManager from "../../data/fs/UserManager.fs.js"
import userManager from "../../data/mongo/managers/UserManager.db.js";
import uploader from "../../middlewares/multer.mid.js";
import isPhoto from "../../middlewares/isPhoto.js";
import isOnline from "../../middlewares/isOnline.js";
import alreadyUpdated from "../../middlewares/alreadyUpdated.js";
import {createToken, verifyToken, updateToken} from"../../utils/jwt.js"
import _ from "mongoose-paginate-v2";

const users = Router();

users.get("/register", async (req, res, next) => {
  try {
    res.render("register", { title: "REGISTER" });
  } catch (error) {
    return next(error);
  }
});

users.get("/login", async (req, res, next) => {
  try {
    res.render("login", { title: "LOGIN" });
  } catch (error) {
    return next(error);
  }
});

users.get("/", isOnline, async (req, res, next) => {
  try {
    const data = verifyToken(req.cookies.token)
    const  _id  = data._id;
    const user = await userManager.readOne(_id);
    res.render("userData", { title: "USER DATA", content: user });
  } catch (error) {
    return next(error);
  }
});

users.get("/settings", isOnline, async (req, res, next) => {
  try {
    const data = verifyToken(req.cookies.token)
    const  _id  = data._id;
    const user = await userManager.readOne(_id);
    res.render("userSettings", { title: "SETTINGS", content: user });
  } catch (error) {
    return next(error);
  }
});

users.get("/role",isOnline, async (req, res, next) => {
  try {
    res.render("update-profile", { title: "ROLE"});
  } catch (error) {
    return next(error)
  }
})

users.put("/", isOnline, alreadyUpdated, uploader.single("photo"), isPhoto, async (req, res, next) => {
  try {
    const { name, photo, role, age } = req.body;
    const token = verifyToken(req.cookies.token)

    //actualizo el session para que se actualize la foto y el role de la navbar
    if(photo){
      token.photo = photo;
      delete token.exp
      res.clearCookie("token")
      const updatedToken = updateToken(req.cookies.token, token)
      res.cookie("token", updatedToken, {signedCookie: true})
    }
    if(role){
      token.role = role
      delete token.exp
      res.clearCookie("token")
      const updatedToken = updateToken(req.cookies.token, token)
      res.cookie("token", updatedToken, {signedCookie: true})
    }
    
    const _id = token._id;
    
    const data = {
      name: name,
      photo: photo,
      role: role,
      age: age
    };
    await userManager.update(_id, data);
    return res.json({
      statusCode: 200,
      message: "The account has been updated"
    })
  } catch (error) {
    return next(error);
  }
});

export default users;
