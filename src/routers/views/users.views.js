import { Router } from "express";
//import userManager from "../../data/fs/UserManager.fs.js"
import {update } from "../../controllers/views/controller.views.users.js";
import {uploader, uploadFile} from "../../middlewares/multer.mid.js";
import isOnline from "../../middlewares/isOnline.js";
import _ from "mongoose-paginate-v2";
import CustomRouter from "../customRouter.js"
import validator from "../../middlewares/joi.validator.js";
import { updateUsersValidate } from "../../schemas/users.validator.js";


class UsersRouter extends CustomRouter {
  init(){
    this.update("/",["USER", "PREMIUM", "ADMIN"], isOnline, uploader.single("photo"), uploadFile, validator(updateUsersValidate), update);
  }
}


const users = new UsersRouter();

export default users.getRouter();
