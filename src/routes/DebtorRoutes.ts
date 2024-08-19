import { Router } from "express";
import { DebtorRepository } from "../repositories/DebtorRepository";
import { UserRepository } from "../repositories/UserRepository";
import { DebtorService } from "../services/DebtorService";
import { DebtorController } from "../controllers/DebtorController";

const debtorRoutes = Router();
const debtorRepository = new DebtorRepository();
const userRepository = new UserRepository();
const debtorService = new DebtorService(debtorRepository, userRepository);
const debtorController = new DebtorController(debtorService);

debtorRoutes.post("/debtor", debtorController.register);
debtorRoutes.get("/debtor/all", debtorController.findAll);
debtorRoutes.get("/debtor", debtorController.findFromUser);
debtorRoutes.delete("/debtor/:id", debtorController.delete);

export { debtorRoutes };
