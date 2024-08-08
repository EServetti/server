import CustomRouter from "../customRouter.js";
import { payment } from "../../controllers/api/controller.api.payment.js";
import hasEnoughStockPay from "../../middlewares/hasEnoughStockPay.js";



class PaymentRouter extends CustomRouter {
    init() {
        this.create("/checkout", ["PUBLIC"], hasEnoughStockPay, payment)
    }
}

const paymentRouter = new PaymentRouter
export default paymentRouter.getRouter()