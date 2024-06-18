import { Bill, ICreateBill, IUpdateBill } from "../@types/Bill";
import { prisma } from "../database/prisma";
import { NotFoundError } from "../errors/CreateCustomError";

export class BillRepository {
  async create(bill: ICreateBill): Promise<Bill | Error> {
    try {
      const newBill = await prisma.bill.create({
        data: bill,
      });
      return newBill;
    } catch (error) {
      throw error;
    }
  }

  async findAllFromDebtor(debtorId: string): Promise<Bill[] | Error> {
    const debtor = await prisma.debtor.findUnique({
      where: { id: debtorId },
    });
    if (!debtor) return new NotFoundError("Debtor doesn't exists");

    const bills = await prisma.bill.findMany({
      where: {
        debtorId,
      },
    });

    if (!bills || bills.length < 1) return new NotFoundError("Bills not found");

    return bills;
  }

  async findAll(): Promise<Bill[] | Error> {
    const bills = await prisma.bill.findMany();

    if (!bills || bills.length < 1) return new NotFoundError("Bills not found");

    return bills;
  }

  async update(id: string, bill: IUpdateBill): Promise<Bill | Error> {
    const billExists = await prisma.bill.findUnique({
      where: { id },
    });

    if (!billExists) return new NotFoundError("Bill doesn't exists");

    const updatedBill = await prisma.bill.update({
      where: { id },
      data: bill,
    });

    return updatedBill;
  }
}
