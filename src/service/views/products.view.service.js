import dao from "../../DAO/dao.factory.js";
import CustomService from "../customService.js"; 

const productsService = new CustomService(dao.productManager)
const {readOneService} = productsService
export {readOneService}