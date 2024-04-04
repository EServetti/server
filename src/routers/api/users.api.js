import { Router } from "express";
import UserManager from "../../data/fs/UserManager.fs.js";

const usersRouter = Router();

usersRouter.get("/", read);
usersRouter.get("/:nid", readOne);
usersRouter.post("/", create);
usersRouter.put("/:nid", update);
usersRouter.delete("/:nid", destroy);

//metodo read
async function read(req, res, next) {
  try {
    const { role } = req.query;
    const all = await UserManager.read(role);
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
    const one = await UserManager.readOne(nid);
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
    const created = await UserManager.create(data);
    return res.json({
      statusCode: 201,
      message: `Created user id = ${created.id}`,
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
  const updated = await UserManager.update(nid, data);
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
    const eliminated = await UserManager.destroy(nid)
    return res.json({
      statusCode: 200,
      message: `Eliminated user id: ${eliminated.id}`
    })
  } catch (error) {
    return next(error)
  }  
}
export default usersRouter;