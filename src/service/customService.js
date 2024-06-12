import userManager from "../DAO/mongo/managers/UserManager.db.js";

userManager
class CustomService {
  constructor(manager) {
    this.manager = manager;
  }
  
  paginateService= async (filter, opts) => {
    try {
      const all = await this.manager.paginate(filter, opts)
      return all
    } catch (error) {
      throw error
    }
  }

   readService = async () => {
    try {
      const all = await this.manager.read()
      return all
    } catch (error) {
      throw error
    }
  }

   readOneService = async (id) => {
    try {
      const one = await this.manager.readOne(id) 
      return one
    } catch (error) {
      throw error
    }
  }
  
  aggregateService = async (arrayConfig) => {
    try {
      const total = await this.manager.aggregate(arrayConfig)
      return total
    } catch (error) {
      throw error
    }
  }
  createService = async (data) => {
    try {
      const one = await this.manager.create(data)
      return one
    } catch (error) {
      throw error
    }
  }

  updateService = async (id, data) => {
    try {
      const one = await this.manager.update(id, data)
      return one
    } catch (error) {
      throw error
    }
  }

  destroyService = async (id) => {
    try {
      const one = await this.manager.destroy(id)
      return one
    } catch (error) {
      throw error
    }
  }
}

export default CustomService