import { Router } from "express";
import isValidUser from "../../middlewares/isValidUser.mid.js";
import isValidPass from "../../middlewares/isValidPass.mid.js";
import userManager from "../../data/mongo/managers/UserManager.db.js";

const sessionRouter = new Router()

//ruta para iniciar sesión 
sessionRouter.post("/login", isValidUser, isValidPass, async (req, res, next) => {
    try {
      const { email } = req.body;
    const one = await userManager.readByEmail(email);
    req.session.email = email;
    req.session.name = one.name;
    req.session.role = one.role;
    req.session.photo = one.photo;
    req.session._id = one._id
    return res.json({
      statusCode: 200,
      message: "You're welcome " + one.name,
    });
    } catch (error) {
      return next(error)
    }
  });
  
//ruta que devuelve los datos del user
sessionRouter.get("/", async (req, res, next) => {
    try {
      console.log("The req.session is " +JSON.stringify(req.session));
      const { email, name, photo, role } = req.session;
      console.log("The email is " + email);
      if(email) {
        return res.json({
          statusCode: 200,
          message: {
            email: email,
            name: name,
            photo: photo,
            role: role
          }
        })
      }
      else {
        return res.json({
          statusCode: 401,
          message: "You must log in!"
        })
      }
    } catch (error) {
      return next(error)
    }
  })

  export default sessionRouter