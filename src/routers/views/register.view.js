import { Router } from "express";

const register = Router();

register.get("/users/register", async (req, res, next) => {
  try {
    res.render("register", {title: "REGISTER"})
  } catch (error) {
    return next(error)
  }
})
export default register;