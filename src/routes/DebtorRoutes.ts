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

/**
 * @swagger
 * tags:
 *   name: Debtors
 *   description: Gestão de devedores
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Debtor:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         name:
 *           type: string
 *           example: "João Silva"
 *         phone:
 *           type: string
 *           example: "+55 11 91234-5678"
 *         email:
 *           type: string
 *           nullable: true
 *           example: "joao@email.com"
 *         bills:
 *           type: array
 *           items:
 *             type: object
 *         userId:
 *           type: string
 *           nullable: true
 *           example: "456e7890-e12b-34d3-a456-426614174111"
 */

/**
 * @swagger
 * /debtor:
 *   post:
 *     summary: Cria um novo devedor
 *     tags: [Debtors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Debtor'
 *     responses:
 *       201:
 *         description: Devedor criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Debtor'
 *       400:
 *         description: Erro na requisição
 */
debtorRoutes.post("/debtor", debtorController.register);

/**
 * @swagger
 * /debtor/all:
 *   get:
 *     summary: Retorna todos os devedores
 *     tags: [Debtors]
 *     responses:
 *       200:
 *         description: Lista de devedores retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Debtor'
 */
debtorRoutes.get("/debtor/all", debtorController.findAll);

/**
 * @swagger
 * /debtor:
 *   get:
 *     summary: Retorna os devedores de um usuário autenticado
 *     tags: [Debtors]
 *     responses:
 *       200:
 *         description: Lista de devedores vinculados ao usuário retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Debtor'
 */
debtorRoutes.get("/debtor", debtorController.findFromUser);

/**
 * @swagger
 * /debtor/{id}:
 *   delete:
 *     summary: Exclui um devedor pelo ID
 *     tags: [Debtors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do devedor a ser excluído
 *     responses:
 *       200:
 *         description: Devedor excluído com sucesso
 *       404:
 *         description: Devedor não encontrado
 */
debtorRoutes.delete("/debtor/:id", debtorController.delete);

export { debtorRoutes };
