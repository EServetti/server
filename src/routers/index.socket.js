import { json } from "express";
import ProductManager from "../data/mongo/managers/ProductManager.db.js"



export default async (socket, multer) => {
  console.log("Client online" + socket.id);
  socket.emit("products", await ProductManager.read());

  socket.on("product", async (data) => {
    console.log(data);

      const allProducts = await ProductManager.read();
      const exist = allProducts.some(each => each.title === data.title);
      if (exist) {
        socket.emit("alert", "The product has already been created!");
      } else {
        await ProductManager.create(data);
        socket.emit("products", await ProductManager.read());
      }
    });
  }

