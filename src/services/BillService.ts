import { Bill } from "../@types/Bill";
import { BillRepository } from "../repositories/BillRepository";
import { DebtorRepository } from "../repositories/DebtorRepository";

export class BillService {
  constructor(
    private billRepository: BillRepository,
    private debtorRepository: DebtorRepository
  ) {}

  async create(
    bill: Omit<Bill, "id" | "debtorId" | "created_at">,
    debtorId: string
  ) {
    const debtor = await this.debtorRepository.findOneById(debtorId);

    if (debtor instanceof Error) return debtor;

    const newBill = {
      ...bill,
      debtorId,
      created_at: new Date(Date.now()),
    };

    try {
      const billRegistered = await this.billRepository.create(newBill);
      return billRegistered;
    } catch (error) {
      return error;
    }
  }

  async findAllFromDebtor(debtorId: string): Promise<Bill[] | Error> {
    const bills = this.billRepository.findAllFromDebtor(debtorId);

    return bills;
  }

  async findAll(): Promise<Bill[] | Error> {
    const bills = this.billRepository.findAll();
    return bills;
  }
}
