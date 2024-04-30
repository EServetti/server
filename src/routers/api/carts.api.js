import { Router } from "express";
//import userManager from "../../data/fs/UserManager.fs.js";
import UserManager from "../../data/mongo/managers/CartManager.db.js"
import exist from "../../middlewares/userExist.js";
import CartManager from "../../data/mongo/managers/CartManager.db.js";

const cartsRouter = Router();


cartsRouter.get("/", read);
cartsRouter.get("/:nid", readOne);
cartsRouter.post("/", exist, create);
cartsRouter.put("/:nid", update);
cartsRouter.delete("/:nid", destroy);

//metodo read
async function read(req, res, next) {
  try {
    const all = await CartManager.read();
    return res.json({
        statusCode: 200,
        message: all,
      });
  } catch (error) {
    return next(error)
  }
}
//metodo readOne
async function readOne(req, res, next) {
  try {
    const { nid } = req.params;
    const one = await CartManager.readOne(nid);
    return res.json({
      statusCode: 200,
      message: one,
    });
  } catch (error) {
    return next(error)
  }
}
//metodo create
async function create(req, res, next) {
  try {
    const data = req.body;
    const created = await CartManager.create(data);
    return res.json({
      statusCode: 201,
      message: `Created cart id = ${created.id}`,
    });
  } catch (error) {
    return next(error)
  }
}
//metodo update
async function update(req, res, next) {
try {
  const { nid } = req.params;
  const data = req.body;
  const updated = await CartManager.update(nid, data);
  return res.json({
    statusCode: 200,
    message: updated
  })
} catch (error) {
  return next(error);
}
}
//metodo destroy
async function destroy (req, res, next) {
  try {
    const { nid } = req.params;
    const eliminated = await CartManager.destroy(nid)
    return res.json({
      statusCode: 200,
      message: `Eliminated cart id: ${eliminated.id}`
    })
  } catch (error) {
    return next(error)
  }  
}
export default cartsRouter;

