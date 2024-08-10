import { readOneService } from "../service/products.api.service.js"

async function isAdmin(req, res, next) {
  try {
    const {user} = req
    const {nid} = req.params 
    if(user.role === "admin") return next()
    else {
      const product = await readOneService(nid)
      if(!product) {
        return res.error404()
      }
      else if(product.supplier_id !== user._id) {
        return res.error401()
      } else {
        return next()
      }
    }
  } catch (error) {
    return next(error)
  }
}

export default isAdmin