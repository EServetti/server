import CustomService from "../customService.js";
import productManager from "../../DAO/mongo/managers/ProductManager.db.js"

const productService = new CustomService(productManager)
const {paginateService, readService, readOneService, createService, updateService, destroyService } = productService
export {paginateService, readService, readOneService, createService, updateService, destroyService }
