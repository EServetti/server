import isUtf8 from "buffer";
import fs from "fs";
import json from "stream/consumers";
import crypto from "crypto";
import log from "console";
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
        throw new Error("¡The file has already been created!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  //metodo para crear un producto
  async create(data) {
    try {
      //revisa que todas las propiedades de product sean ingresadas
      if (!data.title) {
        const error = new Error("Missing data!");
        error.statusCode = 400;
        throw error;
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo:
            data.photo ||
            "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg",
          category: data.category || "product",
          price: data.price || 1,
          stock: data.stock || 1,
        };
        let contant = await fs.promises.readFile(this.path, "utf-8");
        contant = JSON.parse(contant);
        //Reviso que el producto no este creado y lo pusheo a contant
        if (!contant.some((product) => product.title === data.title)) {
          contant.push(product);
          console.log("Product created");
          contant = JSON.stringify(contant, null, 2);
        await fs.promises.writeFile(this.path, contant);
        return product;
        } else {
          const error = new Error('The product has already been created!');
          error.statusCode = 409;
          throw error;
        }
      }
    } catch (error) {
      throw error;
    }
  }
  //metodo para leer todos los productos
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
  //metodo para leer un producto segun su id
  async readOne(id) {
    try {
      let contant = await fs.promises.readFile(this.path, "utf-8");
      contant = JSON.parse(contant);
      let theProduct = contant.find((product) => product.id === id);
      if (!theProduct) {
        const error = new Error("Not found!");
        error.statusCode = 404;
        throw error;
      } else {
        console.log("Product found");
        return theProduct;
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
          console.log("The product has been updated");
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
  //metodo para eliminar un producto
  async destroy(id) {
    try {
      let contant = await fs.promises.readFile(this.path, "utf-8");
      contant = JSON.parse(contant);
      const delProduct = contant.find((product) => (product.id === id));
      if (!delProduct) {
        const error = new Error("not found!");
        error.statusCode = 404;
        throw error;
      } else {
        let filtered = contant.filter((product) => product.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log("The product has been eliminated");
        console.log(delProduct);
        return delProduct;
      }
    } catch (error) {
      throw error;
    }
  }
}
/*
async function test() {
  const productos = new ProductManager();

 //producto 1
  await productos.create({
    title: "Tatin",
    photo:
      "https://masonlineprod.vtexassets.com/arquivos/ids/246188/Alfajor-Simple-Tatin-Negro-33g-1-32815.jpg?v=637883553702800000",
    category: "comida",
    price: 250,
    stock: 25,
  });
  //producto 2
  await productos.create({
    title: "Tarta de Frutas",
    photo:
      "https://placeralplato.com/files/2015/05/Receta-de-tarta-de-frutas-640x480.jpg?width=1200&enable=upscale",
    category: "repostería",
    price: 350,
    stock: 20,
  });
  //producto 3
  await productos.create({
    title: "Auriculares Inalámbricos",
    photo:
      "https://images-na.ssl-images-amazon.com/images/I/71IvLIxaLCL._AC_SL1500_.jpg",
    category: "tecnología",
    price: 1200,
    stock: 15,
  });
  //producto 4
  await productos.create({
    title: "Vestido de Noche",
    photo:
      "https://thumbs.dreamstime.com/b/vestido-de-noche-en-un-maniqu%C3%AD-18692928.jpg",
    category: "moda",
    price: 1800,
    stock: 10,
  });
  //producto 5
  await productos.create({
    title: "Set de Pinceles de Maquillaje",
    photo:
      "https://tienda.artepierrot.cl/wp-content/uploads/2020/10/Pinceles-Social-AP2-600x600.png",
    category: "belleza",
    price: 500,
    stock: 30,
  });
  //producto 6
  await productos.create({
    title: "Balón de Fútbol",
    photo:
      "https://img.planetafobal.com/2021/07/uefa-champions-league-pelota-oficial-2021-2022-pyrostorm-yu.jpg",
    category: "deportes",
    price: 800,
    stock: 25,
  });
  //producto 7
  await productos.create({
    title: "Mochila Escolar",
    photo:
      "https://images-na.ssl-images-amazon.com/images/I/71fU3CrTNZL._AC_SL1500_.jpg",
    category: "accesorios",
    price: 600,
    stock: 18,
  });
  //producto 8
  await productos.create({
    title: "Juego de Mesa de Estrategia",
    photo:
      "https://tse4.mm.bing.net/th?id=OIP.rvtOjGzBffRXMx1Pyb-PegHaE9&pid=Api&P=0&h=180",
    category: "entretenimiento",
    price: 900,
    stock: 12,
  });
  //producto 9
  await productos.create({
    title: "Botines de Fútbol",
    photo:
      "https://www.deportesapalategui.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/o/ao3258-400-phcfh001-1000.jpeg",
    category: "deportes",
    price: 1500,
    stock: 8,
  });
  //producto 10
  await productos.create({
    title: "Juego de Sábanas de Algodón",
    photo:
      "https://tse4.mm.bing.net/th?id=OIP.ZdaYwifhD9W2xNU9xAa9MQHaHa&pid=Api&P=0&h=180",
    category: "hogar",
    price: 1000,
    stock: 20,
  });
  // Producto 11
  await productos.create({
    title: "Manta de Lana Tejida a Mano",
    photo: "foto.png",
    category: "hogar",
    price: 1500,
    stock: 15,
  });
  // Producto 12
  await productos.create({
    title: "Almohadas de Plumas",
    photo: "foto.png",
    category: "hogar",
    price: 500,
    stock: 15,
  });

  // Producto 13
  await productos.create({
    title: "Set de Ollas de Acero Inoxidable",
    photo: "foto.png",
    category: "cocina",
    price: 2000,
    stock: 10,
  });

  // Producto 14
  await productos.create({
    title: "Lámpara de Escritorio LED",
    photo: "foto.png",
    category: "hogar",
    price: 800,
    stock: 25,
  });

  // Producto 15
  await productos.create({
    title: "Set de Toallas de Baño",
    photo: "foto.png",
    category: "hogar",
    price: 1200,
    stock: 18,
  });

  // Producto 16
  await productos.create({
    title: "Silla Ergonómica de Oficina",
    photo: "foto.png",
    category: "hogar",
    price: 1500,
    stock: 12,
  });

  // Producto 17
  await productos.create({
    title: "Juego de Tazas de Porcelana",
    photo: "foto.png",
    category: "cocina",
    price: 600,
    stock: 30,
  });

  // Producto 18
  await productos.create({
    title: "Cortinas Opacas para Ventanas",
    photo: "foto.png",
    category: "hogar",
    price: 1800,
    stock: 8,
  });

  // Producto 19
  await productos.create({
    title: "Espejo de Cuerpo Entero",
    photo: "foto.png",
    category: "hogar",
    price: 1600,
    stock: 10,
  });

  // Producto 20
  await productos.create({
    title: "Set de Cubiertos de Acero Inoxidable",
    photo: "foto.png",
    category: "cocina",
    price: 1000,
    stock: 20,
  });

  //Productos del 21 al 40 creados a traves del router
  //devuelve todos los productos
  const read = await productos.read();
  console.log(read);
  //devuelve el producto 4
  const product4 = await productos.readOne("13b2eea943424b0bcd6a98c1");
  console.log(product4);
  //elimina el producto 10
  //await productos.destroy("6a5afeb55876fd4c9509c764");
  //actualiza el product 13
  await productos.update("5a8be66db3f9da8f403f876a", {
  title: "Set de Ollas de Acero Inoxidable",
  photo: "foto.png",
  category:"cocina",
  price: 1000,
  stock: 100
})
}

test();
*/
const productos = new ProductManager();
export default productos;
