class Manager {
  constructor(Model) {
    this.Model = Model;
  }
  async create(data) {
    try {
      const one = await this.Model.create(data);
      return one
    } catch (error) {
      throw error;
    }
  }
  async read() {
    try {
      const all = await this.Model.find().lean();
      return all;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      const one = await this.Model.findOne({ _id: id }).lean();
      return one;
    } catch (error) {
      throw error;
    }
  }
  async update (id, data) {
    try {
      const one = await this.Model.findByIdAndUpdate(id, data, {new:true}).lean();
      return one
    } catch (error) {
      throw error
    }
  }
  async destroy(id) {
    try {
      const one = this.Model.findByIdAndDelete(id).lean();
      return one;
    } catch (error) {
      throw error;
    }
  }
}

export default Manager;