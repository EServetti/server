import dao from "../../DAO/dao.factory.js";
import CustomService from "../customService.js";

const cartsService = new CustomService(dao.cartManager)
const {createService} = cartsService
export {createService}