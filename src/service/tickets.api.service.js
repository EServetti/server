import cartManager from "../DAO/mongo/managers/CartManager.db.js";
import CustomService from "./customService.js"


const ticketsService = new CustomService(cartManager)
const {aggregateService} = ticketsService
export {aggregateService}