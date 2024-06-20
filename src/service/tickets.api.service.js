import cartsRepository from "../repositories/cartsRepository.js"
import CustomService from "./customService.js"



const ticketsService = new CustomService(cartsRepository)
const {aggregateService} = ticketsService
export {aggregateService}