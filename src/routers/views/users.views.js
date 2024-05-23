import { Router } from "express";
//import userManager from "../../data/fs/UserManager.fs.js"
import userManager from "../../data/mongo/managers/UserManager.db.js";
import uploader from "../../middlewares/multer.mid.js";
import isPhoto from "../../middlewares/isPhoto.js";
import isOnline from "../../middlewares/isOnline.js";
import alreadyUpdated from "../../middlewares/alreadyUpdated.js";

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
    const { _id } = req.session;
    const user = await userManager.readOne(_id);
    res.render("userData", { title: "USER DATA", content: user });
  } catch (error) {
    return next(error);
  }
});

users.get("/settings", isOnline, async (req, res, next) => {
  try {
    const { _id } = req.session;
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

    //actualizo el session para que se actualize la foto y el role de la navbar
    if(photo){
      req.session.photo = photo
    }
    if(role){
      req.session.role = role
    }
    const _id = req.session;
    
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
