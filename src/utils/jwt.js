import jwt from "jsonwebtoken"
import environment from "./env.utils.js"
import CustomError from "./errors/customError.js"
import errors from "./errors/errors.js"

function createToken (data) {
  const token = jwt.sign(data, environment.SECRET_JWT, { expiresIn: 60 * 60})
  return token
}

function verifyToken(token) {
  const data = jwt.verify(token, environment.SECRET_JWT)
  return data
}

//Funcion para actualizar el token
function updateToken(currentToken, newToken) {
  const token = verifyToken(currentToken);

  if (token && token.exp) {
    // Firmar el nuevo token con la misma fecha de expiración que el token original
    const { exp } = token;
    newToken.exp = exp
    const updatedToken = jwt.sign(newToken, environment.SECRET_JWT);
    return updatedToken;
  } else {
    const error = CustomError(errors.expDateToken)
    throw error
  }
}

export {createToken, verifyToken, updateToken}