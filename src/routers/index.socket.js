import productsRepository from "../repositories/productsRepository.js";

export default async (socket) => {
  console.log("client id: " + socket.id);
  socket.on("fetch-products", async () => {
    const all = await productsRepository.readRepository()
    socket.emit("products", all)
  });

  socket.on("created", async () => {
    const all = await productsRepository.readRepository()
    socket.emit("products", all)
  })
}
