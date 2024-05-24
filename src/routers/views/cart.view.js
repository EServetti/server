import { Router } from "express";
import cartManager from "../../data/mongo/managers/CartManager.db.js";
import userManager from "../../data/mongo/managers/UserManager.db.js";
import isOnline from "../../middlewares/isOnline.js";
import { createToken, verifyToken } from "../../utils/jwt.js"

const carts = Router();


carts.get("/", isOnline, async (req, res, next) => {
  try {
    const data = verifyToken(req.cookies.token)
    const  _id  = data._id;
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
    if (req.cookies.token) {
      const token = verifyToken(req.cookies.token)
      const  _id  = token._id
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
    } else {
      console.log("Must log in!");
      return res.json({
        statusCode: 401,
        message: "You must login first!"
      })
    }
  } catch (error) {
    return next(error)
  }
})
export default carts;
