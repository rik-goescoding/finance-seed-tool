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

export function createSeedTransactions(numberOfMonths: number): SeedTransaction[] {
    const transactions: SeedTransaction[] = [];

    const startYear = 2025;
    const startMonth = 0; // January

    for (let i = 0; i < numberOfMonths; i++) {
        const currentMonthDate = new Date(startYear, startMonth + i, 1);

        const year = currentMonthDate.getFullYear();
        const month = currentMonthDate.getMonth() + 1;

        const monthString = String(month).padStart(2, "0");

        const salaryTransaction: SeedTransaction = {
            externalTransactionId: `tx-salary-${year}-${monthString}`,
            bookingDate: `${year}-${monthString}-25`,
            amount: 2850,
            currency: "EUR",
            counterpartyName: "Employer B.V.",
            counterpartyIban: "NL11BANK0123456789",
            description: `Salary for ${year}-${monthString}`,
            direction: "INCOMING",
            status: "BOOKED"
        };

        const spotifyTransaction: SeedTransaction = {
            externalTransactionId: `tx-spotify-${year}-${monthString}`,
            bookingDate: `${year}-${monthString}-28`,
            amount: 14.99,
            currency: "EUR",
            counterpartyName: "Spotify B.V.",
            counterpartyIban: "NL22BANK9876543210",
            description: `Spotify Subscription for ${year}-${monthString}`,
            direction: "OUTGOING",
            status: "BOOKED"
        };

        transactions.push(salaryTransaction, spotifyTransaction);
    }

    return transactions;
}