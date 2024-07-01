import { readByEmailService } from "../service/users.api.service.js";
import CustomError from "../utils/errors/customError.js";
import errors from "../utils/errors/errors.js";

async function isValidUser(req, res, next) {
  try {
    const { email, password } = req.body
    const one = await readByEmailService(email)
    if(!email || !password){
      const error = CustomError(errors.missingData)
      throw error
    }
    return next()
  } catch (error) {
    return next(error)
  }
}

export default isValidUser