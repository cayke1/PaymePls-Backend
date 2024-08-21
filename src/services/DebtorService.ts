import { Debtor } from "../@types/Debtor";
import { DebtorRepository } from "../repositories/DebtorRepository";
import { UserRepository } from "../repositories/UserRepository";

export class DebtorService {
  constructor(
    private debtorRepository: DebtorRepository,
    private userRepository: UserRepository
  ) {}

  async createDebtor(
    debtor: Omit<Debtor, "id" | "userId">,
    userId: string
  ): Promise<Debtor | Error> {
    const userExists = await this.userRepository.findById(userId);

    if (userExists instanceof Error) return userExists;

    const newDebtor = await this.debtorRepository.create({
      ...debtor,
      userId,
    });

    return newDebtor;
  }

  async findFromUser(userId: string): Promise<Debtor[] | Error> {
    const userExists = await this.userRepository.findById(userId);

    if (userExists instanceof Error) return userExists;

    const debtors = await this.debtorRepository.findAllFromUser(userId);

    return debtors;
  }

  async findAll(): Promise<Debtor[] | Error> {
    const debtors = await this.debtorRepository.findAll();
    return debtors;
  }

  async delete(id: string) {
    const deleted = await this.debtorRepository.delete(id);
    return deleted;
  }
}
