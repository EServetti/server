import { Router } from "express";
import cartManager from "../../data/mongo/managers/CartManager.db.js";
import userManager from "../../data/mongo/managers/UserManager.db.js";

const carts = Router();


carts.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const info = {
      uid: uid
    }
    res.render("cart",{title: "CART", info: info} )
  } catch (error) {
    return next(error);
  }
});
export default carts;
