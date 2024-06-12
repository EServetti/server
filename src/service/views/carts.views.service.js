import cartManager from "../../DAO/mongo/managers/CartManager.db.js";
import CustomService from "../customService.js";

const cartsService = new CustomService(cartManager)
const {createService} = cartsService
export {createService}