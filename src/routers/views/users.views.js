import { Router } from "express";
//import userManager from "../../data/fs/UserManager.fs.js"
import userManager from "../../data/mongo/managers/UserManager.db.js";

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

users.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    console.log("The uid is " + uid);
    const user = await userManager.readOne(uid);
    if(!user) {
      res.json({
        statusCode: 404,
        message: "Sorry that user doesn't exist"
      })
    } else {
     //pasar a un objeto plano para poder renderizar
    console.log("The user is "+ user);
    res.render("userData", { title: "USER DATA", content: user });
    }
  } catch (error) {
    return next(error);
  }
});



export default users;
