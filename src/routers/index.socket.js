import { readService as readProductsService, createService as createProductService } from "../service/products.api.service.js";
import { destroyService as destroyCartService, updateService as updateCartService } from "../service/carts.api.service.js";
import path from "path";
import fs from "fs";
import __dirname from "../../utils.js";
import environment from "../utils/env.utils.js";

const { PORT } = environment


//toma el dato de base64 (photo), lo guarda en /img y le da el nombre con la ruta adecuada
const saveBase64Image = (base64String, fileName) => {
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
  const imageBuffer = Buffer.from(base64Data, "base64");
  const imagePath = path.join("public", "img", "product-img", fileName);
  fs.writeFileSync(imagePath, imageBuffer);
  return `/img/product-img/${fileName}`;
};

export default async (socket) => {
  console.log("Client online" + socket.id);

  //socket para real-products
  socket.emit("products", await readProductsService());

  socket.on("product", async (data) => {

    if (data.photo !== "/img/defaultProduct.png") {
      const fileName = `${data.title}.${
        data.photo.split(";")[0].split("/")[1]
      }`;
      data.photo = saveBase64Image(data.photo, fileName);
    }

    const allProducts = await readProductsService();
    const exist = allProducts.some((each) => each.title === data.title);
    if (exist) {
      socket.emit("alert", "The product has already been created!");
    } else {
      await createProductService(data);
      socket.emit("products", await readProductsService());
    }
  });

//socket para cart
  socket.emit("here", "connected")
  socket.on("uid", async (uid) => {
  const path = `http://localhost:${PORT}/api/tickets/${uid}`
  let response = await fetch(path,{
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json" 
    }
  })
  response = await response.json()
  const allCarts = response.message
  if(response.statusCode !== 404) {
    socket.emit("cart", allCarts)
  } else {
    const message = "You don't have anything in cart, let's buy something!"
    socket.emit("anything", message)
  }
})

//Socket para cambiar de cantidad de un carrito
socket.on("quantity", async info => {
  const _id = info.cid;
  const data = {
    quantity: info.quantity
  }
  await updateCartService(_id, data);
  const path = `http://localhost:${PORT}/api/tickets/${info.uid}`
  let response = await fetch(path,{
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json" 
    }
  })
  response = await response.json()
  const allCarts = response.message
  if(response.statusCode !== 404) {
    socket.emit("cart", allCarts)
  } else {
    const message = "You don't have anything in cart, let's buy something!"
    socket.emit("anything", message)
  }
})

//socket para eliminar un carrito
socket.on("delete", async info => {
  await destroyCartService(info.cid);
  const path = `http://localhost:${PORT}/api/tickets/${info.uid}`
  let resp = await fetch(path,{
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json" 
    }
  })
  resp = await resp.json()
  const allCarts = resp.message
  if(resp.statusCode !== 404) {
    socket.emit("cart", allCarts)
  } else {
    const message = "You don't have anything in cart, let's buy something!"
    socket.emit("anything", message)
  }
})

//socket para cancelar
socket.on("cancel", async token => {
  //saco la palabra token= de la cookie enviada en el emit para que quede solo el token
  token = token.split("=")[1]
  let response = await fetch(`http://localhost:${PORT}/api/carts/all`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: token })
  })
  response = await response.json()
  socket.emit("cart", response.message)
  socket.emit("canceled")
})

};
