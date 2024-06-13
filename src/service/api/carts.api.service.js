import cartManager from "../../DAO/mongo/managers/CartManager.db.js";
//import cartManager from "../../DAO/memory/CartsManager.js"
//import cartManager from "../../DAO/fs/CartManager.fs.js"
import CustomService from "../customService.js"

const cartService = new CustomService(cartManager)
const {readService, paginateService, readOneService, createService,updateService, destroyService} = cartService
export {readService, paginateService, readOneService, createService,updateService, destroyService}