import productsRepository from "../repositories/productsRepository.js";
import CustomError from "../utils/errors/customError.js";
import errors from "../utils/errors/errors.js";

async function titleExists(req, res, next) {
  try {
    if(req.body.title){
        const all = await productsRepository.readRepository()
        const exist = all.find((p) => p.title === req.body.title)
        if(exist){
            const error = CustomError.new(errors.productExist)
            throw error
        }
        return next()
    }
    return next()
  } catch (error) {
    return next(error);
  }
}

export default titleExists