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
<<<<<<< HEAD
      const success_url = "http://localhost:5173/thank-you"
=======
      const success_url = "https://everithingforyourhome.vercel.app/thank-you"
>>>>>>> dde28f9844e2b9b2b3f3dbfdf6f85a4bd7ad8576
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