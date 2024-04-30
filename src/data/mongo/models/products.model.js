import mongoose from "mongoose";
import { model, Schema } from "mongoose";
import crypto from "crypto"
import { type } from "os";

const collection =  "products"

const schema = new Schema ({
  title: {type: String, required: true, unique: true, index: true},
  photo: {type: String, default: "/img/defaultProduct.png"},
  category: {type : String, default : "product", index: true},
  price: {type: Number, default: 1},
  stock: { type: Number, default: 1}
},
{
  timestamps: true
});

const Product = model(collection, schema);
export default Product;