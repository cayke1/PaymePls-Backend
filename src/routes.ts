import { Router } from "express";
import { userRoutes } from "./routes/UserRoutes";
import { debtorRoutes } from "./routes/DebtorRoutes";
import enshureAuthenticated from "./middlewares/EnshureAuthenticated";

const routes = Router();

routes.use(userRoutes);

routes.use(enshureAuthenticated);

routes.use(debtorRoutes);

export { routes };
