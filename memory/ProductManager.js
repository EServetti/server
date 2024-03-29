class ProductManager {
  //Se crea el array de clase y priviado que contiene a todos los productos
  static #products = [];
  //metodo para crear un nuevo producto
  create(data) {
    try {
      // Verificar si no se ingreso alguna propiedad
      if (
        !data.title ||
        !data.photo ||
        !data.category ||
        !data.price ||
        !data.stock
      ) {
        console.log("No se ha ingresado una propiedad");
        return;
      }
      const product = {
        id:
          ProductManager.#products.length === 0
            ? 1
            : ProductManager.#products[ProductManager.#products.length - 1].id +
              1,
        title: data.title,
        photo: data.photo || "default",
        category: data.category,
        price: data.price,
        stock: data.stock,
      };
      ProductManager.#products.push(product);
      console.log("El producto se agrago correctamente");
    } catch (error) {
      console.log(error);
    }
  }
  //metodo para leer todos los productos
  read() {
    try {
      return ProductManager.#products;
    } catch (error) {
      console.log(error);
    }
  }
  //metodo para leer un producto especifico
  readOne(data) {
    try {
      for (const product of ProductManager.#products) {
        if (data === product.id) {
          return product;
        }
      }
      return console.log("Id de producto no existente");
    } catch (error) {
      console.log(error);
    }
  }
  //metodo para eliminar un producto especifico
  destroy(data) {
    try {
      const delOne = ProductManager.#products.filter(product => product.id === data);
      console.log(`Se elimino el producto ${data}`);
    } catch (error) {
      console.log(error);
    }
  }
}

//Creo una constante que invoca a la clase ProductManager
const producto = new ProductManager();
//Invoco al metodo create de la clase

producto.create({
  title: "Alfajor",
  photo: "alfajor.jpg",
  category: "comida",
  price: 250,
  stock: 25,
});
//Al faltarle una propiedad (title) no creara este product y devolvera un log
producto.create({
  //title : 'Paquete de harina',
  photo: "harina.jpg",
  category: "comida",
  price: 500,
  stock: 20,
});

producto.create({
  title: "Peine",
  photo: "peine.jpg",
  category: "Higiene",
  price: 400,
  stock: 10,
});

producto.create({
  title: "Cepillo de dientes",
  photo: "cepillo.jpg",
  category: "Higiene",
  price: 400,
  stock: 15,
});

producto.create({
  title: "Gorra",
  photo: "gorra.jpg",
  category: "Indumentaria",
  price: 1000,
  stock: 5,
});
//devuelve todos los productos
console.log(producto.read());
//devuelve un producto especifico segun el id
console.log(producto.readOne(1));
//que pasa en el caso de que el producto solicitado tenda un id no existente
console.log(producto.readOne(10));
//elimino el 5 producto
producto.destroy(4);
