import jwt from "jsonwebtoken"

function createToken (data) {
  const token = jwt.sign(data, process.env.SECRET_JWT, { expiresIn: 60 * 60})
  return token
}

function verifyToken(token) {
  const data = jwt.verify(token, process.env.SECRET_JWT)
  return data
}

//Funcion para actualizar el token
function updateToken(currentToken, newToken) {
  const token = verifyToken(currentToken);

  if (token && token.exp) {
    // Firmar el nuevo token con la misma fecha de expiración que el token original
    const { exp } = token;
    newToken.exp = exp
    const updatedToken = jwt.sign(newToken, process.env.SECRET_JWT);
    return updatedToken;
  } else {
    throw new Error('El token actual no tiene una fecha de expiración válida.');
  }
}

export {createToken, verifyToken, updateToken}