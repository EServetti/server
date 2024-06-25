import fs from "fs";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";

class UserManager {
  constructor() {
    this.path = this.constructPath();
    this.init();
  }
  //constructor de path global
  constructPath() {
    const __filename = fileURLToPath(import.meta.url);
    const directorioBase = path.dirname(__filename);
    const rutaFiles = path.join(directorioBase, "..", "fs", "files");
    const rutaArchivoJSON = path.join(rutaFiles, "users.json");
    return rutaArchivoJSON;
  }
  init() {
    try {
      const exist = fs.existsSync(this.path);
      if (!exist) {
        const stringData = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, stringData);
        console.log("File created successfully");
      } else {
        console.log("The file users has already been created!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  //metodo para crear un usuario
  async create(data) {
    try {
      const user = {
        _id: data._id,
        photo: data.photo,
        name: data.name,
        age: data.age, 
        email: data.email,
        password: data.password,
        role: data.role,
        verify: data.verify,
        verifyCode: data.verifyCode,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      };
      let contant = await this.read();
      contant.push(user);
      contant = JSON.stringify(contant, null, 2);
      await fs.promises.writeFile(this.path, contant);
      return user;
    } catch (error) {
      throw error;
    }
  }
  //metodo para leer todos los usuarios
  async read() {
    try {
      let contant = await fs.promises.readFile(this.path, "utf-8");
      contant = JSON.parse(contant);
      return contant
    } catch (error) {
      throw error;
    }
  }
  //metodo para leer un usuario segun su id
  async readOne(id) {
    try {
      const contant = await this.read();
      let theUser = contant.find((user) => user._id === id);
      return theUser;
    } catch (error) {
      throw error;
    }
  }
  async readByEmail(email) {
    try {
      const contant = await this.read();
      let theUser = contant.find((user) => user.email === email);
      return theUser;
    } catch (error) {
      throw error;
    }
  }
  //metodo para actualizar
  async update(id, data) {
    try {
      let all = await this.read();
      let one = all.find((each) => each._id === id);
      if (!one) {
        return null;
      }
      for (let prop in data) {
        one[prop] = data[prop];
      }
      all = JSON.stringify(all, null, 2);
      await fs.promises.writeFile(this.path, all);
      return one;
    } catch (error) {
      throw error;
    }
  }
  //metodo para eliminar un usuario
  async destroy(id) {
    try {
      let users = await this.read();
      const delUser = users.find((user) => user._id === id);
      let filtered = users.filter((user) => user._id !== id);
      filtered = JSON.stringify(filtered, null, 2);
      await fs.promises.writeFile(this.path, filtered);
      return delUser;
    } catch (error) {
      throw error;
    }
  }
}

const userManager = new UserManager();
export default userManager;
