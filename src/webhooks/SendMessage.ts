import axios from "axios";
import { Bill } from "../@types/Bill";

interface IWebhookPayload {
  message: string;
  debtorContact: string;
  bill: Bill;
}

export async function SendMessage(payload: IWebhookPayload) {
  try {
    const response = await axios.post("", payload);
    console.log('Webhook sent sucessfuly ', response);
  } catch (error) {
    console.log('Failed to send webhook ', error);
  }
}
