import { NextFunction, Request, Response } from "express";
import { BillService } from "../services/BillService";

export class BillController {
  constructor(private billService: BillService) {
    this.register = this.register.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findFromDebtor = this.findFromDebtor.bind(this);
  }

  async register(req: Request, res: Response, next: NextFunction) {
    const { description, value, next_charge, debtorId } = req.body;

    const newBill = this.billService.create(
      {
        description,
        value,
        next_charge,
        active: true,
      },
      debtorId
    );

    if (newBill instanceof Error) return next(newBill);

    return res.status(201).json(newBill);
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    const bills = await this.billService.findAll();
    if (bills instanceof Error) return next(bills);

    return res.json(bills);
  }

  async findFromDebtor(req: Request, res: Response, next: NextFunction) {
    const { debtorId } = req.params;
    const bills = await this.billService.findAllFromDebtor(debtorId);
    if (bills instanceof Error) return next(bills);

    return res.json(bills);
  }
}
