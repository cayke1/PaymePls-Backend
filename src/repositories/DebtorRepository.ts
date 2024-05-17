import { Debtor } from "../@types/Debtor";
import { prisma } from "../database/prisma";
import { ConflictError, NotFoundError } from "../errors/CreateCustomError";

export class DebtorRepository {
  async create(debtor: Omit<Debtor, "id">): Promise<Debtor | Error> {
    const alreadyExists = await prisma.debtor.findUnique({
      where: { phone: debtor.phone },
    });

    if (alreadyExists) {
      return new ConflictError("Debtor already exists");
    }
    try {
      const newDebtor = await prisma.debtor.create({
        data: debtor,
      });
      return newDebtor;
    } catch (error) {
      throw error;
    }
  }

  async findAllFromUser(userId: string): Promise<Debtor[] | Error> {
    const debtors = await prisma.debtor.findMany({
      where: {
        userId,
      },
    });
    if (!debtors || debtors.length < 1) {
      return new NotFoundError("No debtor registered");
    }

    return debtors;
  }

  async findAll(): Promise<Debtor[] | Error> {
    const debtors = await prisma.debtor.findMany();

    if (!debtors || debtors.length < 1) {
      return new NotFoundError("No debtor registered");
    }

    return debtors;
  }

  async findOneById(id: string): Promise<Debtor | Error> {
    const debtor = await prisma.debtor.findUnique({
      where: { id },
    });

    if (!debtor) return new NotFoundError("No debtor registered");

    return debtor;
  }
}
