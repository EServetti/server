import { Router } from "express";
import UserManager from "../../data/fs/UserManager.fs.js";

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
    const user = await UserManager.readOne(uid);
    res.render("userData", { title: "USER DATA", content: user });
  } catch (error) {
    return next(error);
  }
});



export default users;
