import CustomRouter from "../customRouter.js";
import { read, readOne } from "../../controllers/api/controller.api.tickets.js";


class TicketsRouter extends CustomRouter {
  init() {
    this.create("/total", ["PUBLIC"], readOne)
    this.read("/:uid", ["PUBLIC"], read);
  }
}


const ticketsRouter = new TicketsRouter();
export default ticketsRouter.getRouter();
