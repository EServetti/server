import { Router } from "express";
//import userManager from "../../data/fs/UserManager.fs.js";
import { read, readOne, create, update, destroy } from "../../controllers/api/controller.api.users.js";
import exist from "../../middlewares/userExist.js";
import CustomRouter from "../customRouter.js";

class UsersRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], read);
    this.read("/:nid", ["PUBLIC"], readOne);
    this.create("/", ["ADMIN"], exist, create);
    this.update("/:nid", ["ADMIN"], update);
    this.destroy("/:nid", ["ADMIN"], destroy);
  }
}



const usersRouter = new UsersRouter();
export default usersRouter.getRouter();
