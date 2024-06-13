//import userManager from "../../DAO/mongo/managers/UserManager.db.js";
import userManager from "../../DAO/fs/UserManager.fs.js";
//import userManager from "../../DAO/memory/UserManager.js";

import CustomService from "../customService.js";

const usersService = new CustomService(userManager)
const {readService, readOneService, createService, updateService, destroyService} = usersService
export {readService, readOneService, createService, updateService, destroyService}