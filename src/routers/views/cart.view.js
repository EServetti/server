import { Router } from "express";
import cartManager from "../../data/mongo/managers/CartManager.db.js";
import userManager from "../../data/mongo/managers/UserManager.db.js";
import isOnline from "../../middlewares/isOnline.js";
import { createToken, verifyToken } from "../../utils/jwt.js"
import CustomRouter from "../customRouter.js";


class CartsRouter extends CustomRouter {
init(){
  
this.read("/",["USER","ADMIN"], isOnline, async (req, res, next) => {
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

this.create("/",["USER","ADMIN"],  async (req, res, next) => {
  try {
      const token = verifyToken(req.cookies.token)
      const  _id  = token._id
      const { product_id }= req.body
      const data = {
        user_id: _id,
        product_id: product_id,
        quantity: 1
      }
      await cartManager.create(data)
      return res.message201("The product has been added to cart")
  } catch (error) {
    return next(error)
  }
})

}
}

const carts = new CartsRouter();
export default carts.getRouter();
