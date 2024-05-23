import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

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
        console.log("The file has already been created!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async create(data) {
    try {
      if (!data.quantity) {
        const error = new Error("Missing data!");
        error.statusCode = 400;
        throw error;
      }

      const cart = {
        id: crypto.randomBytes(12).toString("hex"),
        userId: crypto.randomBytes(12).toString("hex"),
        productId: crypto.randomBytes(12).toString("hex"),
        quantity: data.quantity,
        state: data.state || "reserved"
      };

      let content = await this.read();
      if (!content.some(c => c.userId === data.userId && c.productId === data.productId)) {
        content.push(cart);
        console.log("Cart created");
        await fs.promises.writeFile(this.path, JSON.stringify(content, null, 2));
        return cart;
      } else {
        const error = new Error("The cart already exists!");
        error.statusCode = 409;
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
      const defaultContent = [];
      await fs.promises.writeFile(this.path, JSON.stringify(defaultContent, null, 2));
      return defaultContent;
    }
  }

  async readOne(id) {
    try {
      const content = await this.read();
      const cart = content.find(c => c.id === id);
      if (!cart) {
        const error = new Error("Cart not found!");
        error.statusCode = 404;
        throw error;
      }
      console.log("Cart found");
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      if (!id || !data) {
        const error = new Error("Missing data!");
        error.statusCode = 400;
        throw error;
      }

      let content = await this.read();
      const index = content.findIndex(c => c.id === id);
      if (index !== -1) {
        content[index] = { ...content[index], ...data };
        console.log("The cart has been updated");
        console.log(content[index]);
        await fs.promises.writeFile(this.path, JSON.stringify(content, null, 2));
        return content[index];
      } else {
        const error = new Error("Cart not found!");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      let content = await this.read();
      const cart = content.find(c => c.id === id);
      if (!cart) {
        const error = new Error("Cart not found!");
        error.statusCode = 404;
        throw error;
      }

      content = content.filter(c => c.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(content, null, 2));
      console.log("The cart has been deleted");
      console.log(cart);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async getNextId(property) {
    const content = await this.read();
    const ids = content.map(c => c[property]);
    const maxId = Math.max(...ids);
    return maxId + 1;
  }
}
/*
async function test()  {
  const cart = new CartManager();
  //creo un carrito
  await cart.create({  quantity: 1, state: "paid" });
  //leo todos los carritos
  const carts = await cart.read();
  console.log(carts);
  //leo un carrito
  const cart1 = await cart.readOne("4aee07486d475ec3e3559dae");
  //console.log(cart1);
  //actualizo un carrito
  //await cart.update(4aee07486d475ec3e3559dae, { quantity: 2, state: "paid" });
  //elimino un carrito
  //await cart.destroy(1);
}
test();
*/

const cartManager = new CartManager();
export default cartManager;