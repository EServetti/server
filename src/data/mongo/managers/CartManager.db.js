import Manager from "../Manager.mongo.js";
import Cart from "../models/carts.model.js"

const CartManager = new Manager(Cart);

export default cartManager;