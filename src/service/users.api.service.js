import CustomService from "./customService.js";
import usersRepository from "../repositories/usersRepository.js";

const usersService = new CustomService(usersRepository)
const {readService, readOneService, readByEmailService, createService, updateService, destroyService} = usersService
export {readService, readOneService, readByEmailService, createService, updateService, destroyService}