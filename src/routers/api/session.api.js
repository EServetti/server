import { Router } from "express";
import isValidUser from "../../middlewares/isValidUser.mid.js";
import passportCb from "../../middlewares/passportCollback.js";
import CustomRouter from "../customRouter.js";
import {
  register,
  login,
  data,
  authenticate,
  signout,
  password,
  passwordUpdate
} from "../../controllers/api/controller.api.session.js";
import { usersValidate, updateUsersValidate, updatePassValidator } from "../../schemas/users.validator.js";
import validator from "../../middlewares/joi.validator.js";

class SessionRouter extends CustomRouter {
  init() {
    //ruta de register
    this.create(
      "/register",
      ["PUBLIC"],
      validator(usersValidate),
      passportCb("register"),
      register
    );

    //ruta de login
    this.create("/login", ["PUBLIC"], isValidUser, passportCb("login"), login);

    //ruta para ver datos del user online
    this.create("/", ["USER", "ADMIN"], passportCb("data"), data);

    //ruta para autenticar una cuenta
    this.read("/verify", ["PUBLIC"], authenticate);

    //ruta de log out
    this.create("/signout", ["USER", "ADMIN"], signout);

    //ruta para enviar un mail de restablecimiento de password
    this.create("/password", ["PUBLIC"], password);
    
    //ruta para actualizar la contraseña
    this.update("/password", ["PUBLIC"], validator(updatePassValidator), passwordUpdate);

  }
}

const sessionRouter = new SessionRouter();
export default sessionRouter.getRouter();
