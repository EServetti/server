import { model, Schema } from "mongoose";

const collection =  "users"

const schema = new Schema ({
  name: {type: String, required: true, index: true},
  age: {type: Number, default: 12},
  photo: {type: String, default: "/img/defaultUser.webp"},
  email: {type: String, required: true, unique: true, index: true},
  password:{type: String, required: true},
  role: {type: Number, default: "user"},
  phone: {type: Number, default: 0},
  verify: {type: Boolean, default: false},
  verifyCode: {type: String, required: true},
  complete: {type: Boolean, default: false}
},
{
  timestamps: true
});

const User = model(collection, schema);
export default User