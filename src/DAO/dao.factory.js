import argsUtil from "../utils/args.util.js";
import dbConnect from "../utils/DbConnection.js";

const persistence = argsUtil.pers;
let dao = {};

async function switchPersistence() {
  try {
    switch (persistence) {
      case "memory":
        try {
          console.log("connected to memory");
          const { default: productsManagerMem } = await import(
            "./memory/ProductManager.js"
          );
          const { default: cartsManagerMem } = await import(
            "./memory/CartsManager.js"
          );
          const { default: usersManagerMem } = await import(
            "./memory/UserManager.js"
          );
          dao = {
            users: usersManagerMem,
            products: productsManagerMem,
            carts: cartsManagerMem,
          };
        } catch (error) {
          console.error("Error loading memory managers:", error);
        }
        break;
      case "fs":
        try {
          console.log("connected to file system");
          const { default: productsManagerFs } = await import(
            "./fs/ProductManager.fs.js"
          );
          const { default: cartsManagerFs } = await import(
            "./fs/CartManager.fs.js"
          );
          const { default: usersManagerFs } = await import(
            "./fs/UserManager.fs.js"
          );
          dao = {
            users: usersManagerFs,
            products: productsManagerFs,
            carts: cartsManagerFs,
          };
        } catch (error) {
          console.error("Error loading file system managers:", error);
        }
        break;
      default:
        try {
          console.log("connected to database");
          await dbConnect();
          const { default: productsManagerMongo } = await import(
            "./mongo/managers/ProductManager.db.js"
          );
          const { default: cartsManagerMongo } = await import(
            "./mongo/managers/CartManager.db.js"
          );
          const { default: usersManagerMongo } = await import(
            "./mongo/managers/UserManager.db.js"
          );
          dao = {
            users: usersManagerMongo,
            products: productsManagerMongo,
            carts: cartsManagerMongo,
          };
        } catch (error) {
          console.error("Error loading database managers:", error);
        }
        break;
    }
  } catch (error) {
    console.error("Error in switchPersistence:", error);
  }
}

await switchPersistence();
export default dao;