import crypto from "crypto"

class CartManager {
  static #carts = [];

  // Método para crear un nuevo carrito
  create(data) {
    try {
      // Verificar si no se ingresaron datos obligatorios
      if (!data.quantity) {
        console.log("Missing data!");
        return;
      }

      const cart = {
        _id: crypto.randomBytes(12).toString("hex"),
        user_id: data.user_id,
        product_id: data.product_id,
        quantity: data.quantity,
        state: data.state || "reserved",
      };

      CartManager.#carts.push(cart);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  // Método para leer todos los carritos
  read() {
    try {
      const all = CartManager.#carts;
      return all;
    } catch (error) {
      throw error;
    }
  }

  paginate(filter, opts) {
    try {
      let all = CartManager.#carts;
      const totalDocs = all.length;
      const { user_id } = filter;
      const limit = opts.limit || 10;
      const page = opts.page || 1;
      console.log(filter);
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
      const currentPageDocs = all[pageArray] 
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

  // Método para leer un carrito específico
  readOne(id) {
    try {
      console.log(id);
      const cart = CartManager.#carts.find((cart) => cart._id === id);
      return cart;
    } catch (error) {
      throw error
    }
  }

  // Método para actualizar un carrito
  update(id, data) {
    try {
      let all = this.read()
      let one = all.find(cart => cart._id === id)
      for (let prop in data) {
        one[prop] = data[prop];
      }
      return one
    } catch (error) {
      console.log(error);
    }
  }

  // Método para eliminar un carrito específico
  destroy(id) {
    try {
      const delOne = this.readOne(id)
      const filtered = CartManager.#carts.filter(
        (product) => product._id !== id
      );
      CartManager.#carts = filtered;
      return delOne
    } catch (error) {
      throw error
    }
  }
}

const cartManager = new CartManager();
export default cartManager;
