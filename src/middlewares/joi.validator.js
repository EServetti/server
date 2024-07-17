import CustomError from "../utils/errors/customError.js"

function validator(schema) {
  return (req, res, next) => {
    const validation = schema.validate(req.body, {abortEarly : false})
    if(validation.error) {
      console.log(validation.error);
      const message = validation.error.details.map((error) => error.message)
      CustomError.new({statusCode: 400, message: message})
    }
    return next()
  }
}

export default validator