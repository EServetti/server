import args from "../../utils/args.util.js"
import crypto from "crypto"

const {pers} = args

class ProductDTO {
    constructor(data) {
        pers !== "mongo" && (this._id = crypto.randomBytes(12).toString("hex"));
        this.title = data.title;
        this.description = data.description;
        this.photo = data.photo || "/img/defaultProduct.png"
        this.category = data.category || "product"
        this.price = data.price || 1;
        this.stock = data.stock || 1;
        this.supplier_id = data.supplier_id
        pers !== "mongo" && (this.createdAt = new Date())
        pers !== "mongo" && (this.updatedAt = new Date())
    }
}

export default ProductDTO