import CustomService from "./customService.js"
import cartsRepository from "../repositories/cartsRepository.js"


const cartService = new CustomService(cartsRepository)
const {readService, paginateService, readOneService, createService,updateService, destroyService} = cartService
export {readService, paginateService, readOneService, createService,updateService, destroyService}

