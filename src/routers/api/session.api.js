import { Router } from "express";
import userManager from "../../data/mongo/managers/UserManager.db.js";
import isValidUser from "../../middlewares/isValidUser.mid.js";
import isValidPass from "../../middlewares/isValidPass.mid.js";
import isValidEmail from "../../middlewares/isValidEmail.mid.js";
import isvalidData from "../../middlewares/isValidData.mid.js";

const sessionRouter = Router();

//ruta de register
sessionRouter.post("/register",isvalidData, isValidEmail, async (req, res, next) => {
  try {
    const data = req.body;
    const one = await userManager.create(data)
    return res.json({
      statusCode: 201,
      message: "The acount has been created!"
    })
  } catch (error) {
    return next(error)
  }
})


//ruta de login
sessionRouter.post("/login", isValidUser, isValidPass, async (req, res, next) => {
  try {
    const { email } = req.body;
  const one = await userManager.readByEmail(email);
  req.session.email = email;
  req.session.name = one.name;
  req.session.role = one.role;
  req.session.photo = one.photo;
  req.session._id = one._id
  console.log("You're welcome " +one.name);
  return res.json({
    statusCode: 200,
    message: "You're welcome " + one.name,
  });
  } catch (error) {
    return next(error)
  }
});

//ruta para ver datos del user online
sessionRouter.post("/", async (req, res, next) => {
  try {
    const { email, name, photo, role } = req.session;
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

//ruta de log out
sessionRouter.post("/signout", async (req, res, next) => {
  try {
    req.session.destroy();
        return res.json({ 
          statusCode: 200,
          message: "loged out!" });
  }catch (error) {
    return next(error);
  }
 });
 
export default sessionRouter;
