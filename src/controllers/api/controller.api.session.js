import { readByEmailService, updateService } from "../../service/users.api.service.js";

async function register (req, res, next) {
    try {
      return res.message201("We've sent you a verification mail!");
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
  
  async function login (req, res, next) {
    try {
      return res.cookie("token", req.user.token, { signedCookie: true, maxAge:3600000 }).message200("You're welcome!");
    } catch (error) {
      return next(error);
    }
  }
  
  async function data (req, res, next) {
    try {
      const one = req.body;
      res.message200(one);
    } catch (error) {
      return next(error);
    }
  }

  async function authenticate (req, res, next) {
    try {
      const {email, verifyCode } = req.query
      const one = await readByEmailService(email)
      const verified = verifyCode === one.verifyCode
      if(!verified) {
        return res.error400("Invalid credentials!")
      } else {
        await updateService(one._id, {
          verify: true
        })
        const message = `The account ${one.email} has been authenticated!`
        return res.render("verify", {title: "VERIFY", message})
      }
    } catch (error) {
      return next(error)
    }
  }
  
  async function signout (req, res, next) {
    try {
      const online = req.cookies.token;
        res.clearCookie("token")
        return res.message200("Loged out!");
    } catch (error) {
      return next(error);
    }
  }

export {register, login, data, authenticate, signout}