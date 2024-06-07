import { createService } from "../../service/views/carts.views.service.js";
import { createToken, verifyToken } from "../../utils/jwt.js"

async function read (req, res, next) {
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
  }
  
  async function create (req, res, next) {
    try {
        const token = verifyToken(req.cookies.token)
        const  _id  = token._id
        const { product_id }= req.body
        const data = {
          user_id: _id,
          product_id: product_id,
          quantity: 1
        }
        await createService(data)
        return res.message201("The product has been added to cart")
    } catch (error) {
      return next(error)
    }
  }

export {read, create}