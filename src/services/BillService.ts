import { Bill, ICreateBill, IUpdateBill } from "../@types/Bill";
import { BillRepository } from "../repositories/BillRepository";
import { DebtorRepository } from "../repositories/DebtorRepository";

export class BillService {
  constructor(
    private billRepository: BillRepository,
    private debtorRepository: DebtorRepository
  ) {}

  async create(
    bill: Omit<ICreateBill, "debtorId" | "created_at">,
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

  async setBillPayd(id: string, date?: Date): Promise<Bill | Error> {
    const payd_at = date ? date : new Date(Date.now());
    const paydBill = this.billRepository.update(id, {
      active: false,
      payd_at,
    });

    return paydBill;
  }

  async update(id: string, bill: IUpdateBill): Promise<Bill | Error> {
    const updatedBill = await this.billRepository.update(id, bill);
    return updatedBill;
  }
}
