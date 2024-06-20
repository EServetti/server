import { readOneService, updateService } from "../../service/users.api.service.js";
import {createToken, verifyToken, updateToken} from"../../utils/jwt.js"

async function register (req, res, next) {
    try {
      res.render("register", { title: "REGISTER" });
    } catch (error) {
      return next(error);
    }
  }
  
  async function login (req, res, next) {
    try {
      res.render("login", { title: "LOGIN" });
    } catch (error) {
      return next(error);
    }
  }
  
  async function data (req, res, next) {
    try {
      const data = verifyToken(req.cookies.token)
      const  _id  = data._id;
      const user = await readOneService(_id);
      res.render("userData", { title: "USER DATA", content: user });
    } catch (error) {
      return next(error);
    }
  }
  
  async function settings (req, res, next) {
    try {
      const data = verifyToken(req.cookies.token)
      const  _id  = data._id;
      const user = await readOneService(_id);
      res.render("userSettings", { title: "SETTINGS", content: user });
    } catch (error) {
      return next(error);
    }
  }
  
  async function role (req, res, next)  {
    try {
      res.render("update-profile", { title: "ROLE"});
    } catch (error) {
      return next(error)
    }
  }
  
  async function update (req, res, next) {
    try {
      const { name, photo, role, age } = req.body;
      const token = verifyToken(req.cookies.token)
  
      //actualizo la session para que se actualize la foto y el role de la navbar
      if(photo){
        token.photo = photo;
        const timeLeft = token.exp
        const maxAge = timeLeft * 1000 - Date.now()
        delete token.exp
        res.clearCookie("token")
        const updatedToken = updateToken(req.cookies.token, token)
        res.cookie("token", updatedToken, {signedCookie: true, maxAge:maxAge})
      }
      if(role){
        token.role = role
        const timeLeft = token.exp
        const maxAge = timeLeft * 1000 - Date.now()
        delete token.exp
        res.clearCookie("token")
        const updatedToken = updateToken(req.cookies.token, token)
        res.cookie("token", updatedToken, {signedCookie: true, maxAge:maxAge})
      }
      
      const _id = token._id;
      
      const data = {
        name: name,
        photo: photo,
        role: role,
        age: age
      };
      await updateService(_id, data);
      return res.message200("The account has been updated!")
    } catch (error) {
      return next(error);
    }
  }

export {register, login, data, settings, role, update}