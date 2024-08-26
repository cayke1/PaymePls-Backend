import { ICreatePayment } from "../@types/Payment";
import { DebtorRepository } from "../repositories/DebtorRepository";
import { PaymentRepository } from "../repositories/PaymentRepository";

export class PaymentService {
  constructor(
    private paymentRepository: PaymentRepository,
    private debtorRepository: DebtorRepository
  ) {}

  async create(
    payment: Omit<ICreatePayment, "debtorId" | "created_at">,
    debtorId: string
  ) {
    const debtor = await this.debtorRepository.findOneById(debtorId);

    if (debtor instanceof Error) return debtor;

    const newPayment = {
      ...payment,
      debtorId,
      created_at: new Date(Date.now()),
    };

    try {
      const paymentRegistered = await this.paymentRepository.create(newPayment);
      return paymentRegistered;
    } catch (error) {
      return error;
    }
  }

  async findAllFromDebtor(debtorId: string) {
    const payments = this.paymentRepository.findAllFromDebtor(debtorId);

    return payments;
  }

  async findAll() {
    const payments = this.paymentRepository.findAll();
    return payments;
  }

  async delete(id: string) {
    const payment = this.paymentRepository.delete(id);
    return payment;
  }
}
