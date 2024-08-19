import { Router } from "express";
import { BillRepository } from "../repositories/BillRepository";
import { BillService } from "../services/BillService";
import { DebtorRepository } from "../repositories/DebtorRepository";
import { BillController } from "../controllers/BillController";
import enshureAuthenticated from "../middlewares/EnshureAuthenticated";

const billRoutes = Router();
const billRepository = new BillRepository();
const debtorRepository = new DebtorRepository();
const billService = new BillService(billRepository, debtorRepository);
const billController = new BillController(billService);
billRoutes.get("/bill/:debtorId", billController.findFromDebtor);
billRoutes.use(enshureAuthenticated);

billRoutes.get("/bill", billController.findAll);
billRoutes.post("/bill", billController.register);
billRoutes.patch("/bill/set_payd/:id", billController.setBillPayd);
billRoutes.put("/bill/:id", billController.update);

export { billRoutes };
