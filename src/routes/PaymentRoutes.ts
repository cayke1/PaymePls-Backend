import { Router } from "express";
import { PaymentRepository } from "../repositories/PaymentRepository";
import { DebtorRepository } from "../repositories/DebtorRepository";
import { PaymentService } from "../services/PaymentService";
import { PaymentController } from "../controllers/PaymentController";
import enshureAuthenticated from "../middlewares/EnshureAuthenticated";

const paymentRoutes = Router();
const paymentRepository = new PaymentRepository();
const debtorRepository = new DebtorRepository();
const paymentService = new PaymentService(paymentRepository, debtorRepository);
const paymentController = new PaymentController(paymentService);

paymentRoutes.get("/payment/:debtorId", paymentController.findFromDebtor);
paymentRoutes.use(enshureAuthenticated);

paymentRoutes.get("/payment", paymentController.findAll);
paymentRoutes.post("/payment", paymentController.register);
paymentRoutes.delete("/payment/:id", paymentController.delete);

export { paymentRoutes };
