import { NextFunction, Request, Response } from "express";
import { BillService } from "../services/BillService";
import { Jobs } from "../jobs";

export class BillController {
  constructor(private billService: BillService) {
    this.register = this.register.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findFromDebtor = this.findFromDebtor.bind(this);
    this.setBillPayd = this.setBillPayd.bind(this);
    this.update = this.update.bind(this);
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
    const jobs = new Jobs();
    jobs.sendChangeMessage(debtorId);
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

  async setBillPayd(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { date } = req.body;

    const bill_payd = await this.billService.setBillPayd(id, date);

    if (bill_payd instanceof Error) return next(bill_payd);

    return res.json(bill_payd);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { description, value, created_at, next_charge, payd_at, active } =
      req.body;
    const updated_bill = await this.billService.update(id, {
      description,
      value,
      created_at,
      next_charge,
      payd_at,
      active,
    });

    if (updated_bill instanceof Error) return next(updated_bill);

    return res.json(updated_bill);
  }
}
