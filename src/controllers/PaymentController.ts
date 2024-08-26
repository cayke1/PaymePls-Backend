import { NextFunction, Request, Response } from "express";
import { PaymentService } from "../services/PaymentService";

export class PaymentController {
  constructor(private paymentService: PaymentService) {
    this.register = this.register.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findFromDebtor = this.findFromDebtor.bind(this);
    this.delete = this.delete.bind(this);
  }

  async register(req: Request, res: Response, next: NextFunction) {
    const { value, debtorId } = req.body;

    const newPayment = this.paymentService.create(
      {
        value,
      },
      debtorId
    );

    if (newPayment instanceof Error) return next(newPayment);

    return res.status(201).json(newPayment);
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    const payments = await this.paymentService.findAll();
    if (payments instanceof Error) return next(payments);

    return res.json(payments);
  }

  async findFromDebtor(req: Request, res: Response, next: NextFunction) {
    const { debtorId } = req.params;
    const payments = await this.paymentService.findAllFromDebtor(debtorId);
    if (payments instanceof Error) return next(payments);

    return res.json(payments);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const payment = await this.paymentService.delete(id);

    return res.json(payment);
  }
}
