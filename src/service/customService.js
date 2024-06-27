
class CustomService {
  constructor(repository) {
    this.repository = repository;
  }
  
  paginateService= async (filter, opts) => {
    try {
      const all = await this.repository.paginateRepository(filter, opts)
      return all
    } catch (error) {
      throw error
    }
  }

   readService = async () => {
    try {
      const all = await this.repository.readRepository()
      return all
    } catch (error) {
      throw error
    }
  }

   readOneService = async (id) => {
    try {
      const one = await this.repository.readOneRepository(id) 
      return one
    } catch (error) {
      throw error
    }
  }
  readByEmailService = async (email) => {
    try {
      const one = await this.repository.readByEmailRepository(email) 
      return one
    } catch (error) {
      throw error
    }
  }
  aggregateService = async (arrayConfig) => {
    try {
      const total = await this.repository.aggregateRepository(arrayConfig)
      return total
    } catch (error) {
      throw error
    }
  }
  createService = async (data) => {
    try {
      const one = await this.repository.createRepository(data)
      return one
    } catch (error) {
      throw error
    }
  }

  updateService = async (id, data) => {
    try {
      const one = await this.repository.updateRepository(id, data)
      return one
    } catch (error) {
      throw error
    }
  }

  destroyService = async (id) => {
    try {
      const one = await this.repository.destroyRepository(id)
      return one
    } catch (error) {
      throw error
    }
  }
}

export default CustomService