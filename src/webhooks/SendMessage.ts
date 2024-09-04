import axios from "axios";
import { Bill } from "../@types/Bill";
import { Payment } from "../@types/Payment";
import { env } from "../utils/env";

interface IWebhookPayload {
  message: string;
  debtorContact: string;
  bill: Bill;
}

interface IWebhookPayloadOnChange {
  debtor: any;
  bills: Bill[];
  payments: Payment[];
}

export async function SendMessage(payload: IWebhookPayload) {
  try {
    const response = await axios.post("", payload);
    console.log("Webhook sent sucessfuly ", response);
  } catch (error) {
    console.log("Failed to send webhook ", error);
  }
}

export async function SendOnChangeMessage(payload: IWebhookPayloadOnChange) {
  console.log("Sending message to debtor");
  try {
    const response = await fetch(`http://localhost:3000/api/send-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    console.log("Webhook sent sucessfuly ", response);
  } catch (error) {
    console.log("Failed to send webhook ", error);
  }
}
