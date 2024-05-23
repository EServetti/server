import mongoose from "mongoose";
import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "carts";

const schema = new Schema(
  {
    user_id: {
      type: Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },
    product_id: {
      type: Types.ObjectId,
      ref: "products",
      required: true,
      index: true,
    },
    quantity: { type: Number, required: true },
    state: {
      type: String,
      default: "reserved",
      enum: ["reserved", "paid", "delivered"],
    },
  },
  {
    timestamps: true,
  }
);

//populate para metodo read()
schema.pre("find", function () {
  this.populate("user_id", "_id photo email role"),
    this.populate("product_id", );
});

//populate para metodo readOne()
schema.pre("findOne", function () {
  this.populate("user_id", "_id photo email role"),
    this.populate("product_id", );
});

schema.plugin(mongoosePaginate);

const Cart = model(collection, schema);

export default Cart;
