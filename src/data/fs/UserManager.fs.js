import isUtf8 from "buffer";
import fs from "fs";
import json from "stream/consumers";
import crypto from "crypto";
import log from "console";
import parse from "path";
import stringify from "querystring";
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
        throw new Error("¡The file has already been created!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  //metodo para crear un usuario
  async create(data) {
    try {
      //revisa que todas las propiedades necesarias de user sean ingresadas
      if (!data.email || !data.password || !data.name || !data.age) {
        const error = new Error("Missing data!");
        error.statusCode = 400;
        throw error;
      } else {
        const user = {
          id: crypto.randomBytes(12).toString("hex"),
          photo:
            data.photo ||
            "https://www.informatique-mania.com/wp-content/uploads/2021/02/guest.png",
          name : data.name,
          age: data.age,
          email: data.email,
          password: data.password,
          role: data.role || "0",
        };
        let contant = await fs.promises.readFile(this.path, "utf-8");
        contant = JSON.parse(contant);
        //Reviso que el usuario no este creado y lo pusheo a contant
        if (!contant.some((user) => user.email === data.email)) {
          contant.push(user);
          console.log("User created");
          contant = JSON.stringify(contant, null, 2);
          await fs.promises.writeFile(this.path, contant);
          return user;
        } else {
          const error = new Error("The user has already been created!");
          error.statusCode = 409;
          throw error;
        }
      }
    } catch (error) {
      throw error;
    }
  }
  //metodo para leer todos los usuarios
  async read() {
    try {
      let contant = await fs.promises.readFile(this.path, "utf-8");
      contant = JSON.parse(contant);
      if (contant.length !== 0) {
        return contant;
      } else {
        const error = new Error("Not found!");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }
  //metodo para leer un usuario segun su id
  async readOne(id) {
    try {
      let contant = await fs.promises.readFile(this.path, "utf-8");
      contant = JSON.parse(contant);
      let theUser = contant.find((user) => user.id === id);
      if (!theUser) {
        const error = new Error("Not found!");
        error.statusCode = 404;
        throw error;
      } else {
        console.log("User found");
        return theUser;
      }
    } catch (error) {
      throw error;
    }
  }
  //metodo para actualizar
  async update(id, data) {
    try {
      if (!id || !data) {
        const error = new Error("Missing data!");
        error.statusCode = 400;
        throw error;
      } else {
        let all = await this.read();
        let one = all.find((each) => each.id === id);
        if (one) {
          for (let prop in data) {
            one[prop] = data[prop];
          }
          console.log("The user has been updated");
          console.log(one);
          all = JSON.stringify(all, null, 2);
          await fs.promises.writeFile(this.path, all);
          return one;
        } else {
          const error = new Error("Not found!");
          error.statusCode = 404;
          throw error;
        }
      }
    } catch (error) {
      throw error;
    }
  }
  //metodo para eliminar un usuario
  async destroy(id) {
    try {
      let contant = await fs.promises.readFile(this.path, "utf-8");
      contant = JSON.parse(contant);
      let delUser = contant.find((user) => (user.id === id));
      if (!delUser) {
        const error = new Error("not found!");
        error.statusCode = 404;
        throw error;
      } else {
        let filtered = contant.filter((user) => user.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log("The user has been eliminated");
        console.log(delUser);
        return delUser;
      }
    } catch (error) {
      throw error;
    }
  }
}

const users = new UserManager;
export default users;