import CustomError from "../utils/errors/customError.js";
import errors from "../utils/errors/errors.js";

async function isValidData(req, res, next) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    if (!email || !password || !name ) {
      const error = CustomError(errors.missingData)
      throw error;
    }
    return next()
  } catch (error) {
    return next(error);
  }
}

export default isValidData