import { schedule } from "node-cron";
import { CheckChargesToday } from "./messages/CheckChargesToday";
import { MapBillsAndTriggerMessage } from "./messages/MapBillsAndTriggerMessage";
import { SendOnChangeMessage } from "../webhooks/SendMessage";
import { DebtorRepository } from "../repositories/DebtorRepository";
import { BillRepository } from "../repositories/BillRepository";
import { PaymentRepository } from "../repositories/PaymentRepository";

export class Jobs {
  async scheduleJobs() {
    console.log("Jobs active");
    schedule("43 16 * * *", async () => {
      console.log("Verifiyng events today...");
      const events = await CheckChargesToday();

      if (events === null) {
        console.log("No event today");
        return;
      }

      MapBillsAndTriggerMessage(events);
    });
  }

  async sendChangeMessage(debtorId: string) {
    try {
      const debtorRepository = new DebtorRepository();
      const billsRepository = new BillRepository();
      const paymentRepository = new PaymentRepository();
      const debtor = await debtorRepository.findOneById(debtorId);
      let bills = await billsRepository.findAllFromDebtor(debtorId);
      let payments = await paymentRepository.findAllFromDebtor(debtorId);
      if (debtor instanceof Error) {
        console.log("Debtor not found");
        return;
      }
      if (bills instanceof Error) {
        bills = [];
      }
      if (payments instanceof Error) {
        payments = [];
      }
      const debtorData = {
        debtor,
        bills,
        payments,
      };
      SendOnChangeMessage(debtorData);
    } catch (error) {
      console.log(error);
    }
  }
}
