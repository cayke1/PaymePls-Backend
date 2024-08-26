export interface Payment {
    id: string;
    value: number;
    created_at: Date;
    debtorId?: string | null;
}

export interface ICreatePayment {
    value: number;
    debtorId: string;
    created_at: Date;
}