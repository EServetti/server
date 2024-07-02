import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";

const schema = new Schema(
  {
    title: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true},
    photo: { type: String, default: "/img/defaultProduct.png" },
    category: { type: String, default: "product", index: true },
    price: { type: Number, default: 1 },
    stock: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongoosePaginate);

const Product = model(collection, schema);
export default Product;
