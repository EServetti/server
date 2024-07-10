import crypto from "crypto";
import { on } from "events";

class ProductManager {
  //Se crea el array de clase y priviado que contiene a todos los productos
  static #products = [];
  //metodo para crear un nuevo producto
  create(data) {
    try {
      const product = {
        _id: data._id,
        title: data.title,
        description: data.description,
        photo: data.photo,
        category: data.category,
        price: data.price,
        stock: data.stock
      };
      ProductManager.#products.push(product);
      return product;
    } catch (error) {
      throw error;
    }
  }
  //metodo para leer todos los productos
  read() {
    try {
      const all = ProductManager.#products;
      return all;
    } catch (error) {
      throw error;
    }
  }
  //paginate
  paginate(filter, opts) {
    try {
      let all = ProductManager.#products;
      const totalDocs = all.length;
      const { category } = filter;
      const limit = opts.limit || 10;
      const page = opts.page || 1;
      if (Object.keys(filter).length !== 0) {
        all = all.filter((c) => c.category === category);
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
  //metodo para leer un producto especifico
  readOne(id) {
    try {
      const all = this.read();
      const one = all.find((p) => p._id === id);
      return one;
    } catch (error) {
      throw error;
    }
  }
  //metodo para actializar un producto
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
  //metodo para eliminar un producto especifico
  destroy(id) {
    try {
      const all = this.read()
      const delOne = all.find(
        (product) => product._id === id
      );
      const filtered = ProductManager.#products.filter(
        (product) => product._id !== id
      );
      ProductManager.#products = filtered;
      return delOne
    } catch (error) {
      return error
    }
  }
}

//Creo una constante que trae la clase ProductManager
const productManager = new ProductManager();
export default productManager;
