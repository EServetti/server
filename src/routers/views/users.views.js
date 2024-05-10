import { Router } from "express";
//import userManager from "../../data/fs/UserManager.fs.js"
import userManager from "../../data/mongo/managers/UserManager.db.js";
import uploader from "../../middlewares/multer.mid.js";
import isPhoto from "../../middlewares/isPhoto.js";

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

users.get("/", async (req, res, next) => {
  try {
    const { _id } = req.session;
    const user = await userManager.readOne(_id);
    res.render("userData", { title: "USER DATA", content: user });
  } catch (error) {
    return next(error);
  }
});

users.get("/settings", async (req, res, next) => {
  try {
    const { _id } = req.session;
    const user = await userManager.readOne(_id);
    res.render("userSettings", { title: "SETTINGS", content: user });
  } catch (error) {
    return next(error);
  }
});

users.put("/", uploader.single("photo"), isPhoto, async (req, res, next) => {
  try {
    const { name, photo } = req.body;
    if(photo){
      req.session.photo = photo
    }
    const _id = req.session;
    console.log(photo + _id);
    const data = {
      name: name,
      photo: photo,
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
