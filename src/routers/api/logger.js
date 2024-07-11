import CustomRouter from "../customRouter.js";

class LoggerRouter extends CustomRouter {
  init() {
    this.read("/error", ["PUBLIC"], (req, res, next) => {
        try {
            return res.error400("Logged error")
        } catch (error) {
            return next(error)
        }
    }),
    this.read("/auth", ["PUBLIC"], (req, res, next) => {
        try {
            return res.error401()
        } catch (error) {
            return next(error)
        }
    }), this.read("/forbidden", ["PUBLIC"], (req, res, next) => {
        try {
            return res.error403()
        } catch (error) {
            return next(error)
        }
    }), this.read("/notfound", ["PUBLIC"], (req, res, next) => {
        try {
            return res.error404()
        } catch (error) {
            return next(error)
        }
    })
  }
}

const loggerRouter = new LoggerRouter();
export default loggerRouter.getRouter();
