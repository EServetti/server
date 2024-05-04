import ProductManager from "../data/mongo/managers/ProductManager.db.js";
import path from "path";
import fs from "fs";
import __dirname from "../../utils.js";
import CartManager from "../data/mongo/managers/CartManager.db.js";

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
  socket.emit("products", await ProductManager.read());

  socket.on("product", async (data) => {
    console.log("Product data: " + JSON.stringify(data, null, 2));

    if (data.photo !== "/img/defaultProduct.png") {
      const fileName = `${data.title}.${
        data.photo.split(";")[0].split("/")[1]
      }`;
      data.photo = saveBase64Image(data.photo, fileName);
    }

    const allProducts = await ProductManager.read();
    const exist = allProducts.some((each) => each.title === data.title);
    if (exist) {
      socket.emit("alert", "The product has already been created!");
    } else {
      await ProductManager.create(data);
      socket.emit("products", await ProductManager.read());
    }
  });

  //socket para cart
  socket.emit("here", "connected")
  socket.on("uid", async (uid) => {
  
  const filter = {
    user_id: uid
  }
  const opts = {} 
  let allCarts = await CartManager.paginate(filter, opts)
  allCarts = allCarts.docs
  //const allCarts = await CartManager.read()
  if(allCarts.length !== 0) {
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
  await CartManager.update(_id, data);
  const filter = {
    user_id: info.uid
  }
  const opts = {}
  let allCarts = await CartManager.paginate(filter, opts)
  allCarts = allCarts.docs 
  socket.emit("cart", allCarts)
})

//socket para eliminar un carrito
socket.on("delete", async info => {
  await CartManager.destroy(info.cid);
  const filter = {
    user_id: info.uid
  }
  const opts = {}
  let allCarts = await CartManager.paginate(filter, opts)
  allCarts = allCarts.docs 
  socket.emit("cart", allCarts)
})

//socket para cancelar
socket.on("cancel", async info => {
  const filter = {
    user_id: info.uid,
  }
  const opts = {};
  let allCarts = await CartManager.paginate(filter, opts)
  allCarts = allCarts.docs 
  allCarts.forEach(async element => {
    await CartManager.destroy(element._id)
  });
  let all = await CartManager.paginate(filter, opts)
  //despues de eliminar los carritos actualizo all y lo envío
  all = all.docs
  socket.emit("cart", all)
  socket.emit("canceled")
})

  //socket para finalizar la compra
  socket.on("finish", async info => {
    const filter = {
      user_id: info.uid,
    }
    const opts = {};
    let allCarts = await CartManager.paginate(filter, opts)
    allCarts = allCarts.docs 
    allCarts.forEach( async element => {
       await CartManager.destroy(element._id)
    });
    socket.emit("cart", allCarts)
    socket.emit("completed")
  })
  
};
