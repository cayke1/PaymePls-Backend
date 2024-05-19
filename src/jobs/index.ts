import { schedule } from "node-cron";
import { CheckChargesToday } from "./messages/CheckChargesToday";
import { MapBillsAndTriggerMessage } from "./messages/MapBillsAndTriggerMessage";

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
}
