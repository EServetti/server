import { Router } from "express";
//import userManager from "../../data/fs/UserManager.fs.js"
import { register, login, data, settings, role, update } from "../../controllers/views/controller.views.users.js";
import uploader from "../../middlewares/multer.mid.js";
import isPhoto from "../../middlewares/isPhoto.js";
import isOnline from "../../middlewares/isOnline.js";
import alreadyUpdated from "../../middlewares/alreadyUpdated.js";
import _ from "mongoose-paginate-v2";
import CustomRouter from "../customRouter.js"

class UsersRouter extends CustomRouter {
  init(){
    this.read("/register", ["PUBLIC"], register );
    
    this.read("/login",["PUBLIC"], login );
    
    this.read("/",["USER","ADMIN"],isOnline, data );
    
    this.read("/settings",["USER","ADMIN"], isOnline, settings );
    
    this.read("/role",["USER","ADMIN"], isOnline, role )
    
    this.update("/",["USER","ADMIN"], isOnline, alreadyUpdated, uploader.single("photo"), isPhoto, update);
  }
}


const users = new UsersRouter();

export default users.getRouter();
