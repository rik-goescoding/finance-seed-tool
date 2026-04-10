import {SeedAccount} from "../models/SeedAccount";
import {SeedTransaction} from "../models/SeedTransaction";

export function createSeedAccount(): SeedAccount {

    return {
        externalAccountId: "account-123",
        iban: "NL91ABNA0417164300",
        accountName: "My Test Account",
        currency: "EUR"
    };
}

export function createSeedTransactions(): SeedTransaction[] {
    const salaryTransaction: SeedTransaction = {
        externalTransactionId: "tx-salary-2025-01",
        bookingDate: "2025-01-25",
        amount: 2850,
        currency: "EUR",

        counterpartyName: "Employer B.V.",
        counterpartyIban: "NL11BANK0123456789",
        description: "Salary January",

        direction: "INCOMING",
        status: "BOOKED"
    };

    const spotifyTransaction: SeedTransaction = {
        externalTransactionId: "tx-spotify-2025-01",
        bookingDate: "2025-01-28",
        amount: 14.99,
        currency: "EUR",

        counterpartyName: "Spotify",
        counterpartyIban: "NL89BANK0110223344",
        description: "Spotify Subscription",

        direction: "OUTGOING",
        status: "BOOKED"
    };

    const bolTransaction: SeedTransaction = {
        externalTransactionId: "tx-bol-2025-01",
        bookingDate: "2025-01-29",
        amount: 78.99,
        currency: "EUR",

        counterpartyName: "Bol.com",
        counterpartyIban: "NL45BANK3344556677",
        description: "Bol.com order #12233",

        direction: "OUTGOING",
        status: "BOOKED"
    };

    return [salaryTransaction, spotifyTransaction, bolTransaction];
}