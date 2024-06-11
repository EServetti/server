import CustomRouter from "../customRouter.js";
import { read } from "../../controllers/views/controller.views.tickets.js";


class TicketsRouter extends CustomRouter {
  init() {
    this.read("/finish", ["USER", "ADMIN"], read);
  }
}


const ticketsRouter = new TicketsRouter();
export default ticketsRouter.getRouter();
