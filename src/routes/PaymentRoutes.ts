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

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Gestão de pagamentos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         value:
 *           type: number
 *           example: 250.75
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2024-02-15T12:34:56Z"
 *         debtorId:
 *           type: string
 *           nullable: true
 *           example: "456e7890-e12b-34d3-a456-426614174111"
 *         Debtor:
 *           type: object
 *           nullable: true
 *           properties:
 *             id:
 *               type: string
 *               example: "456e7890-e12b-34d3-a456-426614174111"
 *             name:
 *               type: string
 *               example: "João Silva"
 */

/**
 * @swagger
 * /payment/{debtorId}:
 *   get:
 *     summary: Retorna os pagamentos de um devedor específico
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: debtorId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do devedor
 *     responses:
 *       200:
 *         description: Lista de pagamentos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Devedor não encontrado
 */
paymentRoutes.get("/payment/:debtorId", paymentController.findFromDebtor);

paymentRoutes.use(enshureAuthenticated);

/**
 * @swagger
 * /payment:
 *   get:
 *     summary: Retorna todos os pagamentos
 *     tags: [Payments]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pagamentos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 */
paymentRoutes.get("/payment", paymentController.findAll);

/**
 * @swagger
 * /payment:
 *   post:
 *     summary: Registra um novo pagamento
 *     tags: [Payments]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: number
 *                 example: 150.00
 *               debtorId:
 *                 type: string
 *                 example: "456e7890-e12b-34d3-a456-426614174111"
 *               created_at:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-02-15T12:34:56Z"
 *     responses:
 *       201:
 *         description: Pagamento registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Erro na requisição
 */
paymentRoutes.post("/payment", paymentController.register);

/**
 * @swagger
 * /payment/{id}:
 *   delete:
 *     summary: Exclui um pagamento pelo ID
 *     tags: [Payments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pagamento a ser excluído
 *     responses:
 *       200:
 *         description: Pagamento excluído com sucesso
 *       404:
 *         description: Pagamento não encontrado
 */
paymentRoutes.delete("/payment/:id", paymentController.delete);

export { paymentRoutes };
