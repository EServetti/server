import { updateService as updateCartService } from "../../service/carts.api.service.js"
import { checkoutService } from "../../service/payment.api.service.js"
import { readOneService, updateService as updateProductService } from "../../service/products.api.service.js"
import environment from "../../utils/env.utils.js"
import Stripe from "stripe"

async function payment(req, res, next) {
  try {
    const {user} = req
    const {_id} = user
    const response = await checkoutService({user_id: _id})
    return res.message200(response.url)
  } catch (error) {
    return next(error);
  }
}

async function webhook(req, res, next) {
  try {
    const stripe = new Stripe(environment.STRIPE_SECRET_KEY)
    const sig = req.headers['stripe-signature'];
    let event;
    event = stripe.webhooks.constructEvent(req.body, sig, environment.STRIPE_WEBHOOK_SECRET);
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const cartsId = JSON.parse(session.metadata.cartsId);
      for (const cart of cartsId) {
        try {
            const one = await updateCartService(cart, { state: "paid" }); 
            const product_id = await readOneService(one.product_id)
            await updateProductService(product_id, {stock: one.stock - 1})
        } catch (error) {
            console.error(`Failed to update cart ${cart}:`, error);
        }
    }
      return res.message200("Successfully paid")
    };
  } catch (error) {
    return next(error)
  }
}

export {payment, webhook}