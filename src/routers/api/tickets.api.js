import CustomRouter from "../customRouter.js";
import { read, readOne } from "../../controllers/api/controller.api.tickets.js";


class TicketsRouter extends CustomRouter {
  init() {
    this.create("/total", ["USER", "ADMIN"], readOne)
    this.read("/:uid", ["USER", "ADMIN"], read);
  }
}


const ticketsRouter = new TicketsRouter();
export default ticketsRouter.getRouter();
