import { Bill } from "../../@types/Bill";
import { prisma } from "../../database/prisma";
import { SendMessageCharge } from "./SendMessageCharge";

export function MapBillsAndTriggerMessage(bills: Bill[]) {
  bills.map(async (event) => {
    if (!event.debtorId) return;
    const debtor = await prisma.debtor.findUnique({
      where: {
        id: event.debtorId,
      },
      include: {
        User: true,
      },
    });
    if (!debtor || !debtor.User) return;
    SendMessageCharge(event, debtor.name, debtor.phone, debtor.User.name);
  });
}
