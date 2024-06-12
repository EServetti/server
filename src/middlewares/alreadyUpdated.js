import userManager from "../DAO/mongo/managers/UserManager.db.js";
import { verifyToken } from "../utils/jwt.js";

async function alreadyUpdated(req, res, next) {
  try {
    if (req.body.role & req.body.age) {
      const token = verifyToken(req.cookies.token);
      const _id = token._id;
      const one = await userManager.readOne(_id);
      if (one.role === 1) {
        const error = new Error("You have already updated your role!");
        error.statusCode = 401;
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
