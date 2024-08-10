import dao from "../DAO/dao.factory.js";
import ProductDTO from "../DAO/DTO/products.dto.js"


class ProductsRepository {
    constructor(manager) {
      this.manager = manager;
    }
    
    paginateRepository= async (filter, opts) => {
      try {
        const all = await this.manager.paginate(filter, opts)
        return all
      } catch (error) {
        throw error
      }
    }
  
     readRepository = async (filter) => {
      try {
        const all = await this.manager.read(filter)
        return all
      } catch (error) {
        throw error
      }
    }
  
     readOneRepository = async (id) => {
      try {
        const one = await this.manager.readOne(id) 
        return one
      } catch (error) {
        throw error
      }
    }
    readByEmailRepository = async (email) => {
      try {
        const one = await this.manager.readByEmail(email) 
        return one
      } catch (error) {
        throw error
      }
    }
    
    createRepository = async (data) => {
      try {
        data = new ProductDTO(data)
        const one = await this.manager.create(data)
        return one
      } catch (error) {
        throw error
      }
    }
  
    updateRepository = async (id, data) => {
      try {
        const one = await this.manager.update(id, data)
        return one
      } catch (error) {
        throw error
      }
    }
  
    destroyRepository = async (id) => {
      try {
        const one = await this.manager.destroy(id)
        return one
      } catch (error) {
        throw error
      }
    }
  }
  

const {products} = dao
const productsRepository = new ProductsRepository(products)
export default productsRepository;