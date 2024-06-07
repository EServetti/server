import cartsManager from "../../data/mongo/managers/CartManager.db.js";
import CustomService from "../customService.js"; 

const cartsService = new CustomService(cartsManager)
const {aggregateService} = cartsService
export {aggregateService}