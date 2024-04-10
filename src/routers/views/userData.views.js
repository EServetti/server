import { Router } from "express";
import UserManager from "../../data/fs/UserManager.fs.js"

const userData = Router();

userData.get("/users/:uid", async (req, res, next) => {
  const { uid } = req.params;
  const user = await UserManager.readOne(uid)
  console.log(user);
  res.render("userData", {title: "USER DATA", content: user})
})

export default userData;