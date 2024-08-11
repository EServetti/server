import { readOneService } from "../service/products.api.service.js"

async function isAdmin(req, res, next) {
  try {
    const {user} = req
    const {nid} = req.params 
    if(user.role === "admin") return next()
    else {
      const product = await readOneService(nid)
      let {_id} = user
      _id = _id.toString()
      let {supplier_id} = product
      supplier_id = supplier_id.toString()
      if(!product) {
        return res.error404()
      }
      else if(supplier_id !== _id) {
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