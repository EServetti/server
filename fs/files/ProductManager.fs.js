const { isUtf8 } = require("buffer");
const fs = require("fs");
const { json } = require("stream/consumers");

class ProductManager {
  constructor() {
    this.path = "../files/products.json";
    this.init();
  }
  init() {
    try {
      const exist = fs.existsSync(this.path);
      if (!exist) {
        const stringData = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, stringData);
        console.log("Archivo creado correctamente");
      } else {
        console.log("Este archivo ya existe");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const productos = new ProductManager();

productos;
