import CustomRouter from "../customRouter.js";
import cartManager from "../../data/mongo/managers/CartManager.db.js";
import { Types } from "mongoose";

class TicketsRouter extends CustomRouter {
  init() {
    this.create("/total", ["PUBLIC"], readOne)
    this.read("/:uid", ["PUBLIC"], read);
  }
}

async function read(req, res, next) {
  try {
    const { uid } = req.params;
    if (uid === ":uid") {
      return res.error400("You must enter uid!");
    }
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
        $set: {subTotal: {$multiply: ["$price", "$quantity"]}}
      }
    ]);
    if (total.length === 0) {
      return res.error404();
    }
    return res.message200(total);
  } catch (error) {
    return next(error);
  }
}


async function readOne(req, res, next) {
  try {
    const { uid } = req.body;
    if (!uid) {
      return res.error400("You must enter uid!");
    }
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
        $set: {subTotal: {$multiply: ["$price", "$quantity"]}}
      },
      {
        $group: {_id:"$user_id", total: {$sum: "$subTotal"}}
      },
      {
        $project: { _id: 0, user_id: "$_id", total: "$total"}
      }
    ]);
    if (total.length === 0) {
      return res.error404();
    }
    return res.message200(total);
  } catch (error) {
    return next(error);
  }
}

const ticketsRouter = new TicketsRouter();
export default ticketsRouter.getRouter();
