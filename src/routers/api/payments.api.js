import CustomRouter from "../customRouter.js";
<<<<<<< HEAD
import { payment, webhook } from "../../controllers/api/controller.api.payment.js";
import express from "express"

class PaymentRouter extends CustomRouter {
    init() {
        this.create("/checkout", ["USER", "ADMIN"], payment)
        this.create("/webhook", ["USER","ADMIN"], express.raw({type: 'application/json'}), webhook)
=======
import { payment } from "../../controllers/api/controller.api.payment.js";
import hasEnoughStockPay from "../../middlewares/hasEnoughStockPay.js";



class PaymentRouter extends CustomRouter {
    init() {
        this.create("/checkout", ["PUBLIC"], hasEnoughStockPay, payment)
>>>>>>> dde28f9844e2b9b2b3f3dbfdf6f85a4bd7ad8576
    }
}

const paymentRouter = new PaymentRouter
export default paymentRouter.getRouter()