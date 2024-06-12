import cartManager from "../../DAO/mongo/managers/CartManager.db.js";
import CustomService from "../customService.js"

const cartService = new CustomService(cartManager)
const {paginateService, readOneService, createService,updateService, destroyService} = cartService
export {paginateService, readOneService, createService,updateService, destroyService}