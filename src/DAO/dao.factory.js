import argsUtil from "../utils/args.util.js";
import dbConnect from "../utils/DbConnection.js";

let dao = {};
const persistence = argsUtil.pers;

switch (persistence) {
  case "memory":
    console.log("Connected to memory");
    const { default: userManagerMem } = await import(
      "../DAO/memory/UserManager.js"
    );
    const { default: productManagerMem } = await import(
      "../DAO/memory/ProductManager.js"
    );
    const { default: cartsManagerMem } = await import(
      "../DAO/memory/CartsManager.js"
    );
    dao = {
      userManager: userManagerMem,
      productManager: productManagerMem,
      cartManager: cartsManagerMem,
    };
    break;
  case "fs":
    console.log("Connected to files system");
    const { default: userManagerFs } = await import("../DAO/fs/UserManager.js");
    const { default: productManagerFs } = await import(
      "../DAO/fs/ProductManager.js"
    );
    const { default: cartsManagerFs } = await import(
      "../DAO/fs/CartManager.js"
    );
    dao = {
      userManager: userManagerFs,
      productManager: productManagerFs,
      cartManager: cartsManagerFs,
    };
    break;
  default:
    console.log("Connected to database");
    await dbConnect()
    const { default: userManagerDb } = await import("../DAO/mongo/managers/UserManager.db.js");
    const { default: productManagerDb } = await import(
      "../DAO/mongo/managers/ProductManager.db.js"
    );
    const { default: cartsManagerDb } = await import(
      "../DAO/mongo/managers/CartManager.db.js"
    );
    dao = {
      userManager: userManagerDb,
      productManager: productManagerDb,
      cartManager: cartsManagerDb,
    };
    break;
}

export default dao;
