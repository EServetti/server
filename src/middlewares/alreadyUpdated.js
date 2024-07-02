import { readOneService } from "../service/users.api.service.js";
import CustomError from "../utils/errors/customError.js";
import errors from "../utils/errors/errors.js";
import { verifyToken } from "../utils/jwt.js";

async function alreadyUpdated(req, res, next) {
  try {
    if (req.body.role & req.body.age) {
      const token = verifyToken(req.cookies.token);
      const _id = token._id;
      const one = await readOneService(_id);
      if (one.role === 1) {
        const error = CustomError.new(errors.alreadyUpdated)
        throw error;
      }
      return next();
    } else {
      return next()
    }
  } catch (error) {
    return next(error);
  }
}

export default alreadyUpdated;
