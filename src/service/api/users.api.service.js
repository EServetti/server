import userManager from "../../data/mongo/managers/UserManager.db.js";
import CustomService from "../customService.js";

const usersService = new CustomService(userManager)
const {readService, readOneService, createService, updateService, destroyService} = usersService
export {readService, readOneService, createService, updateService, destroyService}