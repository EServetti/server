import ProductManager from "../data/mongo/managers/ProductManager.db.js";
import path from "path"
import fs from "fs"
import __dirname from "../../utils.js";

//toma el dato de base64 (photo), lo guarda en /img y le da el nombre con la ruta adecuada
const saveBase64Image = (base64String, fileName) => {
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
  const imageBuffer = Buffer.from(base64Data, 'base64');
  const imagePath = path.join('public', 'img','product-img', fileName);
  fs.writeFileSync(imagePath, imageBuffer);
  return `/img/product-img/${fileName}`;
};


export default async (socket) => {
  console.log("Client online" + socket.id);
  socket.emit("products", await ProductManager.read());

  socket.on("product", async (data) => {
    console.log("Product data: " + JSON.stringify(data, null, 2));
    
    if (data.photo !== "/img/defaultProduct.png") {
      const fileName = `${data.title}.${data.photo.split(';')[0].split('/')[1]}`;
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
};
