import CustomRouter from "../customRouter.js";
import { payment } from "../../controllers/api/controller.api.payment.js";

class PaymentRouter extends CustomRouter {
    init() {
        this.create("/checkout", ["PUBLIC"], payment)
    }
}

const paymentRouter = new PaymentRouter
export default paymentRouter.getRouter()