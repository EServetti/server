import { updateService as updateCartService } from "../../service/carts.api.service.js";
import { checkoutService } from "../../service/payment.api.service.js";
import {
  readOneService,
  updateService as updateProductService,
} from "../../service/products.api.service.js";
import environment from "../../utils/env.utils.js";
import Stripe from "stripe";
import { verifyToken } from "../../utils/jwt.js";

async function payment(req, res, next) {
  try {
    const user = verifyToken(req.cookies.token);
    const { _id } = user;
    const response = await checkoutService({ user_id: _id });
    return res.message200(response.url);
  } catch (error) {
    return next(error);
  }
}

async function webhook(req, res, next) {
  try {
    const stripe = new Stripe(environment.STRIPE_SECRET_KEY);
    const sig = req.headers["stripe-signature"];

    let event;
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      environment.STRIPE_WEBHOOK_SECRET
    );
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const cartsId = JSON.parse(session.metadata.cartsId);
      for (const cart of cartsId) {
        try {
          const date = new Date();
          const day = date.getDate();
          const month = date.getMonth() + 1; 
          const year = date.getFullYear();
          const sellDate = `${day}/${month}/${year}`;
          const one = await updateCartService(cart, {
            state: "paid",
            date: sellDate,
          });
          const product = await readOneService(one.product_id);
          await updateProductService(product._id, {
            stock: product.stock - one.quantity,
          });
        } catch (error) {
          console.error(`Failed to update cart ${cart}:`, error);
        }
      }
      return res.status(200).json({
        statusCode: 200,
        message: "The cart has been updated!",
      });
    }
  } catch (error) {
    return next(error);
  }
}

export { payment, webhook };
