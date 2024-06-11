import { connect } from "mongoose";
import environment from "./env.utils.js";

async function dbConnect() {
    try {
      await connect(environment.MONGO_URI);
      console.log("connected to mongo database");
    } catch (error) {
      console.log(error);
    }
  }

export default dbConnect;