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
  title: "Tatin",
  photo: "https://masonlineprod.vtexassets.com/arquivos/ids/246188/Alfajor-Simple-Tatin-Negro-33g-1-32815.jpg?v=637883553702800000",
  category: "comida",
  price: 250,
  stock: 25,
});
//producto 2
producto.create({
  title: "Tarta de Frutas",
  photo: "https://placeralplato.com/files/2015/05/Receta-de-tarta-de-frutas-640x480.jpg?width=1200&enable=upscale",
  category: "repostería",
  price: 350,
  stock: 20,
});
//producto 3
producto.create({
  title: "Auriculares Inalámbricos",
  photo: "https://images-na.ssl-images-amazon.com/images/I/71IvLIxaLCL._AC_SL1500_.jpg",
  category: "tecnología",
  price: 1200,
  stock: 15,
});

producto.create({
  title: "Vestido de Noche",
  photo: "https://thumbs.dreamstime.com/b/vestido-de-noche-en-un-maniqu%C3%AD-18692928.jpg",
  category: "moda",
  price: 1800,
  stock: 10,
});
//producto 5
producto.create({
  title: "Set de Pinceles de Maquillaje",
  photo: "https://tienda.artepierrot.cl/wp-content/uploads/2020/10/Pinceles-Social-AP2-600x600.png",
  category: "belleza",
  price: 500,
  stock: 30,
});
//producto 6
producto.create({
  title: "Balón de Fútbol",
  photo: "https://img.planetafobal.com/2021/07/uefa-champions-league-pelota-oficial-2021-2022-pyrostorm-yu.jpg",
  category: "deportes",
  price: 800,
  stock: 25,
});
//producto 7
producto.create({
  title: "Mochila Escolar",
  photo: "https://images-na.ssl-images-amazon.com/images/I/71fU3CrTNZL._AC_SL1500_.jpg",
  category: "accesorios",
  price: 600,
  stock: 18,
});
//producto 8
producto.create({
  title: "Juego de Mesa de Estrategia",
  photo: "https://tse4.mm.bing.net/th?id=OIP.rvtOjGzBffRXMx1Pyb-PegHaE9&pid=Api&P=0&h=180",
  category: "entretenimiento",
  price: 900,
  stock: 12,
});
//producto 9
producto.create({
  title: "Botines de Fútbol",
  photo: "https://www.deportesapalategui.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/o/ao3258-400-phcfh001-1000.jpeg",
  category: "deportes",
  price: 1500,
  stock: 8,
});
//producto 10
producto.create({
  title: "Juego de Sábanas de Algodón",
  photo: "https://tse4.mm.bing.net/th?id=OIP.ZdaYwifhD9W2xNU9xAa9MQHaHa&pid=Api&P=0&h=180",
  category: "hogar",
  price: 1000,
  stock: 20,
});

//devuelve todos los productos
console.log(producto.read());
//devuelve un producto especifico segun el id
console.log(producto.readOne(1));
//que pasa en el caso de que el producto solicitado tenda un id no existente
console.log(producto.readOne(10));
//elimino el 5 producto
producto.destroy(4);
