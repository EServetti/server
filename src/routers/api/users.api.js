import { Router } from "express";
//import userManager from "../../data/fs/UserManager.fs.js";
import UserManager from "../../data/mongo/managers/UserManager.db.js";
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

//metodo read
async function read(req, res, next) {
  try {
    const { role } = req.query;
    const all = await UserManager.read();
    const allRole = all.filter((user) => user.role == role);
    //si existen usuarios con la category ingresada los devuelve
    if (allRole.length !== 0) {
      return res.message200(allRole);
    }
    //sino se ingreso una query devuelve todos los usuarios
    else if (!role) {
      return res.message200(all);
    }
    //si no existe la query ingresada devuelve un error
    else {
      return res.error404();
    }
  } catch (error) {
    return next(error);
  }
}
//metodo readOne
async function readOne(req, res, next) {
  try {
    const { nid } = req.params;
    if(nid === ":nid") {
      return res.error400("You must enter nid!")
    }
    const one = await UserManager.readOne(nid);
    if(!one){
      return res.error404()
    }
    return res.message200(one);
  } catch (error) {
    return next(error);
  }
}
//metodo create
async function create(req, res, next) {
  try {
    const data = req.body;
    if(Object.keys(data).length === 0) {
      return res.error400("You must enter at least name, email and password!")
    }
    const created = await UserManager.create(data);
    return res.message201(created);
  } catch (error) {
    return next(error);
  }
}
//metodo update
async function update(req, res, next) {
  try {
    const { nid } = req.params;
    const data = req.body;
    if (Object.keys(data).length === 0 || nid === ":nid") {
      return res.error400("You must enter data and nid!");
    } else {
      const updated = await UserManager.update(nid, data);
      return res.message200(updated);
    }
  } catch (error) {
    return next(error);
  }
}
//metodo destroy
async function destroy(req, res, next) {
  try {
    const { nid } = req.params;
    if(nid === ":nid") {
      return res.error400("You must enter nid!")
    }
    const eliminated = await UserManager.destroy(nid);
    return res.message200(`The user ${eliminated.name} has been deleted`)
  } catch (error) {
    return next(error);
  }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();
