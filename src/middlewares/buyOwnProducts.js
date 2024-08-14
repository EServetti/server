import { readOneService } from "../service/products.api.service.js"
import CustomError from "../utils/errors/customError.js"
import errors from "../utils/errors/errors.js"

async function buyOwnProducts(req, res, next) {
  try {
    const {user} = req
    const {product_id} = req.body
    const product = await readOneService(product_id)
    if(product.supplier_id.toString() === user._id.toString()) {
      const error = CustomError.new(errors.buyOwnProduct)
      throw error
    } else {
      return next()
    }
  } catch (error) {
    return next(error)
  }
}

export default buyOwnProducts