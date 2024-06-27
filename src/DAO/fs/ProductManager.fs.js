import isUtf8 from "buffer";
import fs from "fs";
import json from "stream/consumers";
import crypto from "crypto";
import log, { error } from "console";
import parse from "path";
import stringify from "querystring";
import path from "path";
import { fileURLToPath } from "url";

class ProductManager {
  constructor() {
    this.path = this.constructPath();
    this.init();
  }
  //constructor de path global
  constructPath() {
    const __filename = fileURLToPath(import.meta.url);
    const directorioBase = path.dirname(__filename);
    const rutaFiles = path.join(directorioBase, "..", "fs", "files");
    const rutaArchivoJSON = path.join(rutaFiles, "products.json");
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
        console.log("The file products has already been created!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  //metodo para crear un producto
  async create(data) {
    try {
      const product = {
        _id: data._id,
        title: data.title,
        photo: data.photo,
        category: data.category,
        price: data.price,
        stock: data.stock
      };
      let contant = await fs.promises.readFile(this.path, "utf-8");
      contant = JSON.parse(contant);
      contant.push(product);
      contant = JSON.stringify(contant, null, 2);
      await fs.promises.writeFile(this.path, contant);
      return product;
    } catch (error) {
      throw error;
    }
  }
  //metodo para leer todos los productos
  async read() {
    try {
      let contant = await fs.promises.readFile(this.path, "utf-8");
      contant = JSON.parse(contant);
      return contant;
    } catch (error) {
      throw error;
    }
  }
  //paginate
  async paginate(filter, opts) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      const totalDocs = all.length;
      const { category } = filter;
      const limit = opts.limit || 10;
      const page = opts.page || 1;
      if (Object.keys(filter).length !== 0) {
        all = all.filter((p) => p.category === category);
      }
      //defino funcion para dividir segun cantidad de carts por pagina
      function dividePages(array, limit) {
        const result = [];
        for (let i = 0; i < array.length; i += limit) {
          result.push(array.slice(i, i + limit));
        }
        const totalPages = Math.ceil(array.length / limit);
        return { result, totalPages };
      }
      //divido el contenido en paginas segun el limite que se ingrese
      const paginated = dividePages(all, Number(limit));
      const totalPages = paginated.totalPages;
      all = paginated.result;
      // devuelvo solo la page seleccionada
      const pageArray = page - 1;
      const prevPage = page - 1;
      const nextPage = Number(page) + 1;
      const currentPageDocs = all[pageArray];
      const response = {
        docs: currentPageDocs,
        totalDocs: totalDocs,
        limit: limit,
        totalPages: totalPages,
        page: page,
        prevPage: prevPage > 0 ? prevPage : null,
        nextPage: nextPage > totalPages ? null : nextPage,
      };
      return response;
    } catch (error) {
      throw error;
    }
  }
  //metodo para leer un producto segun su id
  async readOne(id) {
    try {
      const contant = await this.read();
      let theProduct = contant.find((product) => product._id === id);
      return theProduct;
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
  //metodo para eliminar un producto
  async destroy(id) {
    try {
      let contant = await this.read();
      const delProduct = contant.find((product) => product._id === id);
      let filtered = contant.filter((product) => product._id !== id);
      filtered = JSON.stringify(filtered, null, 2);
      await fs.promises.writeFile(this.path, filtered);
      return delProduct;
    } catch (error) {
      throw error;
    }
  }
}

const productManager = new ProductManager();
export default productManager;
