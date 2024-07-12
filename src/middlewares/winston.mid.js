import log from "../utils/winston.js";

function winston(req, res, next) {
  req.logger = log
  const message = `${req.method} - ${req.url} - ${new Date().toLocaleDateString()}`
  req.logger.HTTP(message)
}

export default winston