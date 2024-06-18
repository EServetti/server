import dao from "../../DAO/dao.factory.js"
import CustomService from "../customService.js"


const cartService = new CustomService(dao.cartManager)
const {readService, paginateService, readOneService, createService,updateService, destroyService} = cartService
export {readService, paginateService, readOneService, createService,updateService, destroyService}