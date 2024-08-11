import { aggregateService } from "../../service/tickets.api.service.js";
import { Types } from "mongoose";
import { verifyToken } from "../../utils/jwt.js";

async function read(req, res, next) {
    try {
      const token = verifyToken(req.cookies.token)
      const { _id } = token
      const {state} = req.query
      if(!state) {
        const total = await aggregateService([
          {
            $match: {
              user_id: new Types.ObjectId(_id),
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
<<<<<<< HEAD
      } else {
=======
      } else if(state === "reserved"){
>>>>>>> dde28f9844e2b9b2b3f3dbfdf6f85a4bd7ad8576
        const total = await aggregateService([
          {
            $match: {
              user_id: new Types.ObjectId(_id),
              state: state
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
<<<<<<< HEAD
=======
      } else {
        const total = await aggregateService([
          {
            $match: {
              user_id: new Types.ObjectId(_id),
              state: {$in: ["paid", "delivered"]}
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
>>>>>>> dde28f9844e2b9b2b3f3dbfdf6f85a4bd7ad8576
      }
      
    } catch (error) {
      return next(error);
    }
  }
  
  
  async function readOne(req, res, next) {
    try {
      const token = verifyToken(req.cookies.token)
      const { _id } = token
      const {state} = req.query
      if(!state) {
        const total = await aggregateService([
          {
            $match: {
              user_id: new Types.ObjectId(_id),
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
      } else {
        const total = await aggregateService([
          {
            $match: {
              user_id: new Types.ObjectId(_id),
              state: state
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
      }
    } catch (error) {
      return next(error);
    }
  }

export {read, readOne}