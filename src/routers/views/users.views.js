import { Router } from "express";
//import userManager from "../../data/fs/UserManager.fs.js"
import {update } from "../../controllers/views/controller.views.users.js";
import {uploader, uploadFile} from "../../middlewares/multer.mid.js";
import isOnline from "../../middlewares/isOnline.js";
import alreadyUpdated from "../../middlewares/alreadyUpdated.js";
import _ from "mongoose-paginate-v2";
import CustomRouter from "../customRouter.js"


class UsersRouter extends CustomRouter {
  init(){
    this.update("/",["USER","ADMIN"], isOnline, alreadyUpdated, uploader.single("photo"), uploadFile, update);
  }
}


const users = new UsersRouter();

export default users.getRouter();
