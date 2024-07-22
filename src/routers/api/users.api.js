import { Router } from "express";
//import userManager from "../../data/fs/UserManager.fs.js";
import { read, readOne, create, update, destroy } from "../../controllers/api/controller.api.users.js";
import exist from "../../middlewares/userExist.js";
import CustomRouter from "../customRouter.js";
import emailExists from "../../middlewares/emailExists.js";
import validator from "../../middlewares/joi.validator.js";
import {updateUsersValidate, usersValidate} from "../../schemas/users.validator.js";

class UsersRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], read);
    this.read("/:nid", ["PUBLIC"], readOne);
    this.create("/", ["ADMIN"], exist, validator(usersValidate), create);
    this.update("/:nid", ["ADMIN"], emailExists, validator(updateUsersValidate), update);
    this.destroy("/:nid", ["ADMIN"], destroy);
  }
}



const usersRouter = new UsersRouter();
export default usersRouter.getRouter();
