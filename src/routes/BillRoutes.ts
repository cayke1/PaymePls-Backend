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
/**
 * @swagger
 * components:
 *   schemas:
 *     Bill:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         description:
 *           type: string
 *         value:
 *           type: number
 *         created_at:
 *           type: string
 *           format: date-time
 *         next_charge:
 *           type: string
 *           format: date-time
 *         payd_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         active:
 *           type: boolean
 *         debtorId:
 *           type: string
 *           nullable: true
 *     ICreateBill:
 *       type: object
 *       required:
 *         - description
 *         - value
 *         - created_at
 *         - next_charge
 *         - active
 *       properties:
 *         description:
 *           type: string
 *         value:
 *           type: number
 *         created_at:
 *           type: string
 *           format: date-time
 *         next_charge:
 *           type: string
 *           format: date-time
 *         payd_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         active:
 *           type: boolean
 *         debtorId:
 *           type: string
 *           nullable: true
 *     IUpdateBill:
 *       type: object
 *       properties:
 *         description:
 *           type: string
 *         value:
 *           type: number
 *         created_at:
 *           type: string
 *           format: date-time
 *         next_charge:
 *           type: string
 *           format: date-time
 *         payd_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         active:
 *           type: boolean
 */

billRoutes.get("/bill/:debtorId", billController.findFromDebtor);

/**
 * @swagger
 * /bill:
 *   get:
 *     summary: Obtém todas as contas cadastradas (requer autenticação)
 *     tags: [Bills]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de contas obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bill'
 *       401:
 *         description: Não autorizado
 */
billRoutes.get("/bill", enshureAuthenticated, billController.findAll);

/**
 * @swagger
 * /bill:
 *   post:
 *     summary: Cadastra uma nova conta (requer autenticação)
 *     tags: [Bills]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ICreateBill'
 *     responses:
 *       201:
 *         description: Conta cadastrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bill'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
billRoutes.post("/bill", enshureAuthenticated, billController.register);

/**
 * @swagger
 * /bill/{id}:
 *   put:
 *     summary: Atualiza uma conta existente (requer autenticação)
 *     tags: [Bills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da conta a ser atualizada
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IUpdateBill'
 *     responses:
 *       200:
 *         description: Conta atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bill'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Conta não encontrada
 *       401:
 *         description: Não autorizado
 */
billRoutes.put("/bill/:id", enshureAuthenticated, billController.update);


export { billRoutes };
