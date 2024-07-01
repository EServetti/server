import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import errors from "../../utils/errors/errors.js";
import CustomError from "../../utils/errors/customError";


class CartManager {
  constructor() {
    this.path = this.constructPath();
    this.init();
  }

  constructPath() {
    const __filename = fileURLToPath(import.meta.url);
    const directorioBase = path.dirname(__filename);
    const rutaFiles = path.join(directorioBase, "..", "fs", "files");
    const rutaArchivoJSON = path.join(rutaFiles, "carts.json");
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
        console.log("The file carts has already been created!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async create(data) {
    try {
      const cart = {
        _id: data._id,
        user_id: data.user_id,
        product_id: data.product_id,
        quantity: data.quantity,
        state: data.state,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      };

      let content = await this.read();
      if (
        !content.some(
          (c) => c.user_id === data.user_id && c.product_id === data.product_id
        )
      ) {
        content.push(cart);
        console.log("Cart created");
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(content, null, 2)
        );
        return cart;
      } else {
        const error = CustomError(errors.exists)
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  async read() {
    try {
      const content = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(content);
    } catch (error) {
      throw error;
    }
  }

  async paginate(filter, opts) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      const totalDocs = all.length;
      const { user_id } = filter;
      const limit = opts.limit || 10;
      const page = opts.page || 1;
      if (Object.keys(filter).length !== 0) {
        all = all.filter((c) => c.user_id === user_id);
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

  agreggate(obj) {
    try {
      return []
    } catch (error) {
      throw error
    }
  }

  async readOne(id) {
    try {
      const content = await this.read();
      const cart = content.find((c) => c._id === id);
      return cart;
    } catch (error) {
      throw error;
    }
  }

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

  async destroy(id) {
    let contant = await this.read()
    const delProduct = contant.find((product) => product._id === id);
      let filtered = contant.filter((product) => product._id !== id);
      filtered = JSON.stringify(filtered, null, 2);
      await fs.promises.writeFile(this.path, filtered);
      return delProduct;
    
  }

}


const cartManager = new CartManager();
export default cartManager;
