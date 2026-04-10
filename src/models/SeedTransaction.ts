export interface SeedTransaction {

    externalTransactionId: string;
    bookingDate: string; // Later eventueel Date , nu is string gemakkelijk
    amount: number;
    currency: string;

    counterpartyName: string;
    counterpartyIban: string;
    description: string;

    direction: "INCOMING" | "OUTGOING";
    status: "BOOKED" | "PENDING";
}