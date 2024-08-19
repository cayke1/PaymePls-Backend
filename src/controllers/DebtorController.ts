import { NextFunction, Request, Response } from "express";
import { DebtorService } from "../services/DebtorService";
import { GetIdByToken } from "../utils/GetIdByToken";
import { UnauthorizedError } from "../errors/CreateCustomError";
import { Debtor } from "../@types/Debtor";

export class DebtorController {
  constructor(private debtorService: DebtorService) {
    this.register = this.register.bind(this);
    this.findFromUser = this.findFromUser.bind(this);
    this.findAll = this.findAll.bind(this);
  }

  async register(req: Request, res: Response, next: NextFunction) {
    const { name, phone, email } = req.body;
    if (!req.headers.authorization) {
      return next(new UnauthorizedError());
    }
    const userId = GetIdByToken(req.headers.authorization);

    const debtor: Omit<Debtor, "id" | "userId"> = {
      name,
      phone,
      email,
    };

    const newDebtor = await this.debtorService.createDebtor(debtor, userId);

    if (newDebtor instanceof Error) {
      return next(newDebtor);
    }

    return res.status(201).json(newDebtor);
  }

  async findFromUser(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) return next(new UnauthorizedError());
    const userId = GetIdByToken(req.headers.authorization);

    const debtors = await this.debtorService.findFromUser(userId);

    if (debtors instanceof Error) {
      return next(debtors);
    }

    return res.json(debtors);
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    const debtors = await this.debtorService.findAll();
    if (debtors instanceof Error) {
      return next(debtors);
    }

    return res.json(debtors);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const deleted = await this.debtorService.delete(id);
    if (deleted instanceof Error) {
      return next(deleted);
    }

    return res.status(200).send();
  }
}
