import mongoose from "mongoose";
import { model, Schema } from "mongoose";
import crypto from "crypto"
import { type } from "os";

const collection =  "users"

const schema = new Schema ({
  name: {type: String, required: true, index: true},
  photo: {type: String, default: "/img/defaultUser.webp"},
  email: {type: String, required: true, unique: true, index: true},
  password:{type: String, required: true},
  role: {type: Number, default: 0}
},
{
  timestamps: true
});

const User = model(collection, schema);
export default User;