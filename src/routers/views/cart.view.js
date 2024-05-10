import { Router } from "express";
import cartManager from "../../data/mongo/managers/CartManager.db.js";
import userManager from "../../data/mongo/managers/UserManager.db.js";

const carts = Router();


carts.get("/", async (req, res, next) => {
  try {
    const { _id } = req.session;
    const info = {
      uid: _id
    }
    res.render("cart",{title: "CART", info: info} )
  } catch (error) {
    return next(error);
  }
});

carts.post("/", async (req, res, next) => {
  try {
    const {_id} = req.session;
    const { product_id }= req.body
    const data = {
      user_id: _id,
      product_id: product_id,
      quantity: 1
    }
    await cartManager.create(data)
    return res.json({
      statusCode: 201,
      message: "The product has been added to cart"
    })
  } catch (error) {
    return next(error)
  }
})
export default carts;
