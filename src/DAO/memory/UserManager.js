import crypto, { verify } from "crypto"

class UserManager {
  //Se crea el array de clase y priviado que contiene a todos los usuarios
  static #users = [];
  //metodo para crear un nuevo usuario
  create(data) {
    try {
      const user = {
        _id: data._id,
        photo: data.photo,
        name: data.name,
        age: data.age,
        email: data.email,
        password: data.password,
        role: data.role,
        phone: data.phone,
        verify: data.verify,
        verifyCode: data.verifyCode,
        complete: data.complete,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      };
      UserManager.#users.push(user);
      return user
    } catch (error) {
      throw error
    }
  }
  //metodo para leer todos los usuarios
  read() {
    try {
      const all = UserManager.#users;
      return all;
    } catch (error) {
      throw error
    }
  }
  //metodo para leer un usuario especifico
  readOne(id) {
    try {
      const all = this.read();
      const one = all.find((u) => u._id === id);
      return one;
    } catch (error) {
      throw error
    }
  }
  readByEmail(email) {
    try {
      const all = this.read();
      const one = all.find((u) => u.email === email);
      return one;
    } catch (error) {
      throw error
    }
  }
  //metodo para actializar un usuario
  update(id, data) {
    try {
      const all = this.read();
      let one = all.find((each) => each._id === id);
      for (let prop in data) {
        one[prop] = data[prop];
      }
      return one;
    } catch (error) {
      throw error
    }
  }
  //metodo para eliminar un usuario especifico
  destroy(id) {
    try {
      const all = this.read()
      const delOne = all.find(
        (product) => product._id === id
      );
      const filtered = UserManager.#users.filter(
        (user) => user._id !== id
      );
      UserManager.#users = filtered;
      return delOne
    } catch (error) {
      throw error
    }
  }
}

const userManager = new UserManager();
export default userManager