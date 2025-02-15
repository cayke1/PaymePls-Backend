import { Debtor } from "./Debtor";

export interface User {
    id: string,
    name: string,
    email: string,
    password: string,
    debtors?: Debtor[] | null
}