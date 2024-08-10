import Stripe from "stripe"
import environment from "../utils/env.utils.js"
import { paginateService } from "../service/carts.api.service.js"
import CheckoutProduct from "../DAO/DTO/payment.dto.js"

async function checkoutRepository(filter) {
    try {
      const stripe = new Stripe(environment.STRIPE_SECRET_KEY)
      filter.state = "reserved"
      let productsOnCart = await paginateService(filter, {})
      productsOnCart = productsOnCart.docs
      const cartsId = productsOnCart.map((each) => each._id)
      productsOnCart = productsOnCart.map((each) => new CheckoutProduct(each))
      const line_items = productsOnCart;
      const mode = "payment";
      const success_url = "https://everithingforyourhome.vercel.app/thank-you"
      const intent = await stripe.checkout.sessions.create({
        line_items,
        mode,
        success_url,
        metadata: {
          cartsId: JSON.stringify(cartsId)
        }
      })
      return intent
    } catch (error) {
        throw error
    }
}

export {checkoutRepository}