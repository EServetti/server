import { aggregateService } from "../../service/tickets.api.service.js";
import { verifyToken } from "../../utils/jwt.js";
import { Types } from "mongoose";
import environment from "../../utils/env.utils.js";
const {PORT} = environment

async function read(req, res, next) {
    try {
      let token = req.cookies.token;
      token = verifyToken(token);
      if (!token) {
        return res.error400("You must log in!");
      }
      const uid = token._id;
      //carritos con sus precios
      const total = await aggregateService([
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
      let response = await fetch(`http://localhost:${PORT}/api/tickets/total`, {
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

export {read}