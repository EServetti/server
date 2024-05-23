import Manager from "../Manager.mongo.js";
import Product from "../models/products.model.js";

const productManager = new Manager(Product)

export default productManager;