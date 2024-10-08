import dao from "../DAO/dao.factory.js"
import CartDTO from "../DAO/DTO/carts.dto.js"


class CartRepository {
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
  
     readRepository = async () => {
      try {
        const all = await this.manager.read()
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
    aggregateRepository = async (arrayConfig) => {
      try {
        const total = await this.manager.aggregate(arrayConfig)
        return total
      } catch (error) {
        throw error
      }
    }
    createRepository = async (data) => {
      try {
        const cartDTO = new CartDTO(data)
        await cartDTO.initialize()
        const one = await this.manager.create(cartDTO)
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
  
const {carts} = dao
const cartsRepository = new CartRepository(carts)
export default cartsRepository