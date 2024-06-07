import productManager from "../../data/mongo/managers/ProductManager.db.js";
import CustomService from "../customService.js"; 

const productsService = new CustomService(productManager)
const {readOneService} = productsService
export {readOneService}