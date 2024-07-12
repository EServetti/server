import { connect } from "mongoose";
import environment from "./env.utils.js";

async function dbConnect() {
    try {
      await connect(environment.MONGO_URI);
    } catch (error) {
      return error
    }
  }

export default dbConnect;