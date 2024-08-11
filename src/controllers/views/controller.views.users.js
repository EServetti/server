import { updateService } from "../../service/users.api.service.js";
import {verifyToken, updateToken} from"../../utils/jwt.js"

  async function update (req, res, next) {
    try {
      const { name, photo, role, phone, age, complete } = req.body;
      const token = verifyToken(req.cookies.token)

      //actualizo la session para que se actualize la foto y el role de la navbar
      if(photo){
        token.photo = photo;
        const timeLeft = token.exp
        const maxAge = timeLeft * 1000 - Date.now()
        delete token.exp
        res.clearCookie("token", { secure: true, sameSite: "None"})
        const updatedToken = updateToken(req.cookies.token, token)
        res.cookie("token", updatedToken, { secure: true, signedCookie: true, maxAge:maxAge, sameSite: "None"})
      }
      if(role){
        token.role = role
        const timeLeft = token.exp
        const maxAge = timeLeft * 1000 - Date.now()
        delete token.exp
        res.clearCookie("token", { secure: true, sameSite: "None"})
        const updatedToken = updateToken(req.cookies.token, token)
        res.cookie("token", updatedToken, { secure: true, signedCookie: true, maxAge:maxAge, sameSite: "None"})
      }
      if(name) {
        token.name = name
        const timeLeft = token.exp
        const maxAge = timeLeft * 1000 - Date.now()
        delete token.exp
        res.clearCookie("token", { secure: true, sameSite: "None"})
        const updatedToken = updateToken(req.cookies.token, token)
        res.cookie("token", updatedToken, { secure: true, signedCookie: true, maxAge:maxAge, sameSite: "None"})
      }
      if(complete) {
        token.complete = complete
        const timeLeft = token.exp
        const maxAge = timeLeft * 1000 - Date.now()
        delete token.exp
        res.clearCookie("token", { secure: true, sameSite: "None"})
        const updatedToken = updateToken(req.cookies.token, token)
        res.cookie("token", updatedToken, { secure: true, signedCookie: true, maxAge:maxAge, sameSite: "None"})
      }
      if(age) {
        token.age = age
        const timeLeft = token.exp
        const maxAge = timeLeft * 1000 - Date.now()
        delete token.exp
        res.clearCookie("token", { secure: true, sameSite: "None"})
        const updatedToken = updateToken(req.cookies.token, token)
        res.cookie("token", updatedToken, { secure: true, signedCookie: true, maxAge:maxAge, sameSite: "None"})
      }

      if(phone) {
        token.phone = phone
        const timeLeft = token.exp
        const maxAge = timeLeft * 1000 - Date.now()
        delete token.exp
        res.clearCookie("token", { secure: true, sameSite: "None"})
        const updatedToken = updateToken(req.cookies.token, token)
        res.cookie("token", updatedToken, { secure: true, signedCookie: true, maxAge:maxAge, sameSite: "None"})
      }

      
      const _id = token._id;
      
      const data = {
        name: name,
        photo: photo,
        role: role,
        phone: phone,
        age: age,
        complete: complete
      };
      await updateService(_id, data);
      return res.message200("The account has been updated!")
    } catch (error) {
      return next(error);
    }
  }

export {update}