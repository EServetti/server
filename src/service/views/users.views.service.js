import userManager from "../../data/mongo/managers/UserManager.db.js";
import CustomService from "../customService.js"; 

const usersService = new CustomService(userManager)
const {readOneService, updateService} = usersService
export {readOneService, updateService}