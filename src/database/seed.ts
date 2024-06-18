import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "email@test.com" },
    update: {},
    create: {
      email: "email@test.com",
      name: "example",
      password: await hash("test", 8),
    },
  });

  console.log("Seed finalizado");
  console.log(admin);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });