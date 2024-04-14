import ProductManager from "../data/fs/ProductManager.fs.js"


export default async (socket) => {
  console.log("Client online" + socket.id);
  socket.emit("products", await ProductManager.read());
  socket.on("product", async (data) => {
    console.log(data);
  await ProductManager.create(data);
  socket.emit("products", await ProductManager.read())
})
}