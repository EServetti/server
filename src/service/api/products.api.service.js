import dao from "../../DAO/dao.factory.js";
import CustomService from "../customService.js";

const productService = new CustomService(dao.productManager)
const {paginateService, readService, readOneService, createService, updateService, destroyService } = productService
export {paginateService, readService, readOneService, createService, updateService, destroyService }
