import { Router } from "express";

const login = Router()

login.get("/login", async (req, res, next) => {
  try {
    res.render("login", {title: "LOGIN"})
  } catch (error) {
    return next(error)
  }
})

export default login;