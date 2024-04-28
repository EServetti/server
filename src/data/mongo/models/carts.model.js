import mongoose from "mongoose";
import { model, Schema, Types } from "mongoose";
import crypto from "crypto"
import { type } from "os";

const collection =  "carts"

const schema = new Schema ({
  user_id: {type: Types.ObjectId, ref: "users", required: true, index: true},
  product_id: {type: Types.ObjectId, ref: "products", required: true, index: true},
  quantity: {type: Number, required: true},
  state: {type: String, default: "reserved", enum: ["reserved", "paid", "delivered" ]}
},
{
  timestamps: true
});

const Cart = model(collection, schema);
export default Cart;