import { paginateService } from "../service/carts.api.service.js";
import { readOneService as readOneProductService } from "../service/products.api.service.js";
import CustomError from "../utils/errors/customError.js";
import errors from "../utils/errors/errors.js";
import { verifyToken } from "../utils/jwt.js";

async function hasEnoughStockPay(req, res, next) {
  try {
    const token = verifyToken(req.cookies.token)
    const {_id} = token
    let carts = await paginateService({user_id: _id}, {})
    
    carts = carts.docs
    for(const cart of carts) {
        try {
            const product = await readOneProductService(cart.product_id)
            if(product.stock < cart.quantity) {
                const error = CustomError.new(errors.noSufficientStock)
                throw error
            }
        } catch (error) {
            throw error
        }
    }
    return next()
  } catch (error) {
    return next(error)
  }
}

export default hasEnoughStockPay