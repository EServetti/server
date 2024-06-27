import args from "../../utils/args.util.js";
import crypto from "crypto";
import { readOneService as readOneUser } from "../../service/users.api.service.js";
import { readOneService as readOneProduct } from "../../service/products.api.service.js";

const { pers } = args;

class CartDTO {
  constructor(data) {
    pers !== "mongo" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    if (pers === "mongo") {
      this.user_id = data.user_id;
      this.product_id = data.product_id
    } else {
      this.user_id = this.getUserId(data.user_id)
      this.product_id = this.getProductId(data.product_id)
    }
    this.quantity = data.quantity;
    this.state = data.state || "reserved";
    pers !== "mongo" && (this.createdAt = new Date());
    pers !== "mongo" && (this.updatedAt = new Date());
  }

  async getUserId(user_id) {
    try {
      const user = await readOneUser(user_id)
      delete user.name
      delete user.age
      delete user.password
      return user
    } catch (error) {
        throw error
    }
  }

  async getProductId(product_id) {
    try {
      const product = await readOneProduct(product_id)
      return product
    } catch (error) {
        throw error
    }
  }

  async initialize() {
    this.user_id = await this.user_id;
    this.product_id = await this.product_id;
  }
}

export default CartDTO;
