import CustomRouter from "../customRouter.js";
import { payment, webhook } from "../../controllers/api/controller.api.payment.js";
import express from "express"

class PaymentRouter extends CustomRouter {
    init() {
        this.create("/checkout", ["USER", "ADMIN"], payment)
        this.create("/webhook", ["PUBLIC"], express.raw({type: 'application/json'}), webhook)
    }
}

const paymentRouter = new PaymentRouter
export default paymentRouter.getRouter()