import dao from "../../DAO/dao.factory.js";
import CustomService from "../customService.js";

const usersService = new CustomService(dao.userManager)
const {readService, readOneService, readByEmailService, createService, updateService, destroyService} = usersService
export {readService, readOneService, readByEmailService, createService, updateService, destroyService}