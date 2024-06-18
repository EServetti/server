import dao from "../../DAO/dao.factory.js";
import CustomService from "../customService.js"; 

const usersService = new CustomService(dao.userManager)
const {readOneService, updateService} = usersService
export {readOneService, updateService}