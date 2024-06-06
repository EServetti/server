import { verifyToken } from "../../utils/jwt.js";
import CustomRouter from "../customRouter.js";
import cartManager from "../../data/mongo/managers/CartManager.db.js";
import { Types } from "mongoose";

class TicketsRouter extends CustomRouter {
  init() {
    this.read("/finish", ["USER", "ADMIN"], read);
  }
}

async function read(req, res, next) {
  try {
    let token = req.cookies.token;
    token = verifyToken(token);
    if (!token) {
      return res.error400("You must log in!");
    }
    const uid = token._id;
    //carritos con sus precios
    const total = await cartManager.aggregate([
      {
        $match: {
          user_id: new Types.ObjectId(uid),
        },
      },
      {
        $lookup: {
          foreignField: "_id",
          from: "products",
          localField: "product_id",
          as: "product_id",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$product_id", 0] }, "$$ROOT"],
          },
        },
      },
      {
        $set: { subTotal: { $multiply: ["$price", "$quantity"] } },
      },
    ]);
    //total de carritos
    let response = await fetch("http://localhost:8080/api/tickets/total", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({uid})
    });
    response = await response.json();
    const totalPrice = response.message[0].total
    return res.render("finishBuy", { title: "FINISH", total, totalPrice });
  } catch (error) {
    return next(error);
  }
}

const ticketsRouter = new TicketsRouter();
export default ticketsRouter.getRouter();
