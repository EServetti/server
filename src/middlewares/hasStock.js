import { readOneService } from "../service/products.api.service"
import CustomError from "../utils/errors/customError"
import errors from "../utils/errors/errors"

async function hasStock(req, res, next) {
  try {
    const {product_id} = req.body
    const product = await readOneService(product_id)
    if(product.stock === 0) {
      const error = CustomError.new(errors.hasNoStock)
      throw error
    } else {
      return next()
    }
  } catch (error) {
    return next(error)
  }
}


export default hasStock