import { ICreatePayment, Payment } from "../@types/Payment";
import { prisma } from "../database/prisma";
import { NotFoundError } from "../errors/CreateCustomError";

export class PaymentRepository {
  async create(payment: ICreatePayment): Promise<Payment | Error> {
    try {
      const newPayment = await prisma.payment.create({
        data: payment,
      });
      return newPayment;
    } catch (error) {
      throw error;
    }
  }

  async findAllFromDebtor(debtorId: string): Promise<Payment[] | Error> {
    const debtor = await prisma.debtor.findUnique({
      where: { id: debtorId },
    });
    if (!debtor) return new NotFoundError("Debtor doesn't exists");

    const payments = await prisma.payment.findMany({
      where: {
        debtorId,
      },
    });

    if (!payments || payments.length < 1)
      return new NotFoundError("Payments not found");

    return payments;
  }

  async findAll(): Promise<Payment[] | Error> {
    const payments = await prisma.payment.findMany();
    if (!payments || payments.length < 1)
      return new NotFoundError("Payments not found");
    return payments;
  }

  async delete(id: string) {
    try {
      await prisma.payment.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
}
