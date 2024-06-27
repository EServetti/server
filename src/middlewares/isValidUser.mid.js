import { readByEmailService } from "../service/users.api.service.js";

async function isValidUser(req, res, next) {
  try {
    const { email, password } = req.body
    const one = await readByEmailService(email)
    if(!email || !password){
      const error = new Error("You must enter the email and password");
      error.statusCode = 401;
      throw error
    }
    return next()
  } catch (error) {
    return next(error)
  }
}

export default isValidUser