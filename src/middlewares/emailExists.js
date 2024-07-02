
import usersRepository from "../repositories/usersRepository.js";
import CustomError from "../utils/errors/customError.js";
import errors from "../utils/errors/errors.js";

async function emailExists(req, res, next) {
  try {
    if(req.body.email){
        const all = await usersRepository.readRepository()
        const exist = all.find((u) => u.email === req.body.email)
        if(exist){
            const error = CustomError.new(errors.userExists)
            throw error
        }
        return next()
    }
    return next()
  } catch (error) {
    return next(error);
  }
}

export default emailExists