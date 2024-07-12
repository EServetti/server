import logger from "../utils/winston.js";
function errorHandler(error, req, res, next) {
    const message = `${req.method} - ${req.url} - ${error.statusCode || 500 } - message: ${error.message} - ${new Date().toLocaleDateString()}`
    logger.ERROR(message)
    return res.json({
        statusCode: error.statusCode || 500,
        message: error.message || "CODER API ERROR"
    }) 
}
 export default errorHandler;