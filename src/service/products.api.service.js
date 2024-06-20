import CustomService from "./customService.js";
import productsRepository from "../repositories/productsRepository.js";


const productService = new CustomService(productsRepository)
const {paginateService, readService, readOneService, createService, updateService, destroyService } = productService
export {paginateService, readService, readOneService, createService, updateService, destroyService }
