import { updateService } from "../../service/carts.api.service.js"
import { checkoutService } from "../../service/payment.api.service.js"
import environment from "../../utils/env.utils.js"

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
    const sig = req.headers['stripe-signature'];
    let event;
    event = stripe.webhooks.constructEvent(req.body, sig, environment.STRIPE_WEBHOOK_SECRET);
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const cartsId = JSON.parse(session.metadata.cart_ids);
      cartsId.forEach( async (cart) => {
        await updateService(cart, {
          state: "paid"
        })
      return res.message200("Successfully paid")
      });
    };
  } catch (error) {
    return next(error)
  }
}

export {payment, webhook}