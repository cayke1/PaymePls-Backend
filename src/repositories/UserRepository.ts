import { User } from "@prisma/client";
import { prisma } from "../database/prisma";

export class UserRepository {
  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User | Error> {
    const userToCreate = {
      name,
      email,
      password,
    };
    try {
      const user = await prisma.user.create({
        data: userToCreate,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string) {}
}
