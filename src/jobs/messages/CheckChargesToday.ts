import { prisma } from "../../database/prisma";

export async function CheckChargesToday() {
  const today = new Date(Date.now());
  const startToday = new Date(today.setHours(0, 0, 0, 0));
  const endToday = new Date(today.setHours(23, 59, 59, 999));
  const billsToday = await prisma.bill.findMany({
    where: {
      next_charge: {
        gte: startToday,
        lte: endToday,
      },
    }
  });

  if (billsToday.length < 1) return null;

  return billsToday;
}
