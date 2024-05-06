import { Request, Router } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";
import { AuthController } from "../controllers/AuthController";

const userRoutes = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authController = new AuthController(userService);

userRoutes.post("/login", authController.login);

userRoutes.post("/signup", authController.register);

userRoutes.get("/verify", authController.verifyToken);

export { userRoutes };  