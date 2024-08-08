import { readOneService as readOneCartService } from "../service/carts.api.service.js";
import { readOneService as readOneProductService } from "../service/products.api.service.js";
import CustomError from "../utils/errors/customError.js";
import errors from "../utils/errors/errors.js";

async function hasEnoughStock(req, res, next) {
  try {
    const {quantity} = req.body
    const { nid } = req.params;
    const cart = await readOneCartService(nid)
    const {product_id} = cart
    const product = await readOneProductService(product_id)
   
    if(product.stock < quantity) {
      const error = CustomError.new(errors.noSufficientStock)
      throw error
    } else {
      return next()
    }
  } catch (error) {
    return next(error)
  }
}

export default hasEnoughStock