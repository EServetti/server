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
          id:
            CartManager.#carts.length === 0 
              ? 1
              : CartManager.#carts[CartManager.#carts.length - 1].id + 1,
          user_id:
            CartManager.#carts.length === 0
              ? 1
              : CartManager.#carts[CartManager.#carts.length - 1].id + 1,
            product_id:
              CartManager.#carts.length === 0
                ? 1
                : CartManager.#carts[CartManager.#carts.length - 1].id + 1,
            quantity: data.quantity,
            state: data.state || "reserved",
        };
  
        CartManager.#carts.push(cart);
        console.log("The cart has been created");
        console.log(cart);
      } catch (error) {
        console.log(error);
      }
    }
  
    // Método para leer todos los carritos
    read() {
      try {
        const all = CartManager.#carts;
        return all;
      } catch (error) {
        console.log(error);
      }
    }
  
    // Método para leer un carrito específico
    readOne(id) {
      try {
        const cart = CartManager.#carts.find((cart) => cart.id === id);
        if (cart) {
          return cart;
        } else {
          console.log("Cart not found!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  
    // Método para actualizar un carrito
    update(id, data) {
      try {
        if (!id || !data) {
          console.log("Missing data!");
          return;
        }
  
        const cartIndex = CartManager.#carts.findIndex((cart) => cart.id === id);
  
        if (cartIndex !== -1) {
          CartManager.#carts[cartIndex] = { ...CartManager.#carts[cartIndex], ...data };
          console.log("The cart has been updated");
          console.log(CartManager.#carts[cartIndex]);
        } else {
          console.log("Cart not found!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  
    // Método para eliminar un carrito específico
    destroy(id) {
      try {
        const index = CartManager.#carts.findIndex((cart) => cart.id === id);
        if (index !== -1) {
          CartManager.#carts.splice(index, 1);
          console.log("The cart has been deleted");
        } else {
          console.log("Cart not found!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  const cartManager = new CartManager();

// Crear un carrito
cartManager.create({
  quantity: 10,
  state: "paid"
});

// Leer todos los carritos
console.log(cartManager.read());

// Leer un carrito específico
console.log(cartManager.readOne(1));

// Actualizar un carrito
cartManager.update(1, { quantity: 25,
state: "delivered" });

// Eliminar un carrito
cartManager.destroy(1);