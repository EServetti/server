import  isUtf8  from "buffer";
import fs from "fs";
import  json  from "stream/consumers";
import crypto from"crypto";
import  log  from"console";
import  parse  from "path";
import  stringify  from"querystring";
import path from 'path';
import { fileURLToPath } from 'url';


class ProductManager {
  constructor() {
    this.path = this.constructPath();
    this.init();
  }
  //constructor de path global
  constructPath() {
const __filename = fileURLToPath(import.meta.url);
const directorioBase = path.dirname(__filename);
const rutaFiles = path.join(directorioBase, '..', 'fs', 'files');
const rutaArchivoJSON = path.join(rutaFiles, 'products.json');
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
        throw new Error('¡The file has already been created!')
      }
    } catch (error) {
      console.log(error);
    }
  }
  //metodo create
  async create(data) {
    try {
      //revisa que todas las propiedades de product sean ingresadas
      if (
        !data.title ||
        !data.category ||
        !data.price ||
        !data.stock
      ) {
        throw new Error("¡Missing data!");
        return;
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo:
            data.photo ||
            "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg",
          category: data.category,
          price: data.price,
          stock: data.stock,
        };
        let contant = await fs.promises.readFile(this.path, "utf-8");
        contant = JSON.parse(contant);
        //Reviso que el producto no este creado y lo pusheo a contant
        if (!contant.some(product => product.title === data.title)) {
          contant.push(product);
          console.log("Product created");
        }else{
          throw new Error('¡The product has already been created!')
        }
        contant = JSON.stringify(contant, null, 2);
        await fs.promises.writeFile(this.path, contant);
      }
    } catch (error) {
      console.log(error);
    }
  }
  //metodo read
  async read(cat) {
    try {
      let contant = await fs.promises.readFile(this.path, "utf-8");
      contant = JSON.parse(contant);
      console.log(contant);
      if (cat) {
        contant = contant.filter(each => each.category === cat);
      }
      return contant
    } catch (error) {
      console.log(error);
    }
  }
  //metodo readOne
  async readOne(id) {
    try {
      let contant = await fs.promises.readFile(this.path, "utf-8");
      contant = JSON.parse(contant);
      let theProduct = contant.find((product) => product.id === id);
      if (!theProduct) {
        throw new Error("¡Product not found!");
      } else {
        console.log('Product found');
        console.log(theProduct);
        return theProduct;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async destroy(id) {
    try{
      let contant = await fs.promises.readFile(this.path, 'utf-8');
      contant = JSON.parse(contant);
      const delProduct = contant.find((product) => product.id = id);
      if (!delProduct) {
        throw new Error('¡Product not found!');
        return;
      }else {
        let filtered = contant.filter((product) => product.id !== id)
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log('The product has been eliminated');
        console.log(delProduct);
      }
    }catch(error){
      console.log(error);
    }
  }
}

async function test() {

const productos = new ProductManager();

//producto 1
await productos.create({
  title: "Tatin",
  photo: "https://masonlineprod.vtexassets.com/arquivos/ids/246188/Alfajor-Simple-Tatin-Negro-33g-1-32815.jpg?v=637883553702800000",
  category: "comida",
  price: 250,
  stock: 25,
});
//producto 2
await productos.create({
  title: "Tarta de Frutas",
  photo: "https://placeralplato.com/files/2015/05/Receta-de-tarta-de-frutas-640x480.jpg?width=1200&enable=upscale",
  category: "repostería",
  price: 350,
  stock: 20,
});
//producto 3
await productos.create({
  title: "Auriculares Inalámbricos",
  photo: "https://images-na.ssl-images-amazon.com/images/I/71IvLIxaLCL._AC_SL1500_.jpg",
  category: "tecnología",
  price: 1200,
  stock: 15,
});
//producto 4
await productos.create({
  title: "Vestido de Noche",
  photo: "https://thumbs.dreamstime.com/b/vestido-de-noche-en-un-maniqu%C3%AD-18692928.jpg",
  category: "moda",
  price: 1800,
  stock: 10,
});
//producto 5
await productos.create({
  title: "Set de Pinceles de Maquillaje",
  photo: "https://tienda.artepierrot.cl/wp-content/uploads/2020/10/Pinceles-Social-AP2-600x600.png",
  category: "belleza",
  price: 500,
  stock: 30,
});
//producto 6
await productos.create({
  title: "Balón de Fútbol",
  photo: "https://img.planetafobal.com/2021/07/uefa-champions-league-pelota-oficial-2021-2022-pyrostorm-yu.jpg",
  category: "deportes",
  price: 800,
  stock: 25,
});
//producto 7
await productos.create({
  title: "Mochila Escolar",
  photo: "https://images-na.ssl-images-amazon.com/images/I/71fU3CrTNZL._AC_SL1500_.jpg",
  category: "accesorios",
  price: 600,
  stock: 18,
});
//producto 8
await productos.create({
  title: "Juego de Mesa de Estrategia",
  photo: "https://tse4.mm.bing.net/th?id=OIP.rvtOjGzBffRXMx1Pyb-PegHaE9&pid=Api&P=0&h=180",
  category: "entretenimiento",
  price: 900,
  stock: 12,
});
//producto 9
await productos.create({
  title: "Botines de Fútbol",
  photo: "https://www.deportesapalategui.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/a/o/ao3258-400-phcfh001-1000.jpeg",
  category: "deportes",
  price: 1500,
  stock: 8,
});
//producto 10
await productos.create({
  title: "Juego de Sábanas de Algodón",
  photo: "https://tse4.mm.bing.net/th?id=OIP.ZdaYwifhD9W2xNU9xAa9MQHaHa&pid=Api&P=0&h=180",
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


await productos.read();
//devuelve el producto 4
await productos.readOne('b5b939f6321fcd6ba5c18786');
//elimina el producto 10
//await productos.destroy('6a5afeb55876fd4c9509c764');
}

test();

const productos = new ProductManager();
export default productos;
