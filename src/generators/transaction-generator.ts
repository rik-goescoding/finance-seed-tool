import {SeedAccount} from "../models/SeedAccount";
import {SeedTransaction} from "../models/SeedTransaction";

const supermarktIbans: Record<string, string> = {
    "Albert Heijn": "NL10BANK0000000001",
    "Jumbo": "NL10BANK0000000002",
    "Lidl": "NL10BANK0000000003",
    "Aldi": "NL10BANK0000000004",
    "Plus": "NL10BANK0000000005",
    "Dirk": "NL10BANK0000000006",
    "Coop": "NL10BANK0000000007",
    "Spar": "NL10BANK0000000008",
    "Vomar": "NL10BANK0000000009",
    "DekaMarkt": "NL10BANK0000000010"
};

const supermarktNamen = Object.keys(supermarktIbans);

export function createSeedAccount(): SeedAccount {

    return {
        externalAccountId: "account-123",
        iban: "NL91ABNA0417164300",
        accountName: "My Test Account",
        currency: "EUR"
    };
}

export function createSeedTransactions(numberOfMonths: number): SeedTransaction[] {
    const fixedTransactions: SeedTransaction[] = [];
    const groceryTransactions: SeedTransaction[] = [];

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

        fixedTransactions.push(salaryTransaction, spotifyTransaction);

        const groceriesForMonth = createRandomSupermarktTransactionsForMonth(year, monthString);
        groceryTransactions.push(...groceriesForMonth);
    }

    return [...fixedTransactions, ...groceryTransactions].sort((a,b) =>
        a.bookingDate.localeCompare(b.bookingDate));
}

function createRandomSupermarktTransactionsForMonth(year: number, monthString: string): SeedTransaction[] {
    const transactions: SeedTransaction[] = [];
    const numberOfTransactions = getRandomInt(4, 6);

    const usedDays = new Set<number>();

    for (let j = 0; j < numberOfTransactions; j++) {
        const supermarkt = getRandomSupermarkt();
        const iban = supermarktIbans[supermarkt];
        const day = getUniqueRandomDay(usedDays, 2, 27);
        const dayString = String(day).padStart(2, "0");

        const transaction: SeedTransaction = {
            externalTransactionId: `tx-supermarkt-${year}-${monthString}-${dayString}-${j + 1}`,
            bookingDate: `${year}-${monthString}-${dayString}`,
            amount: getRandomTransactionAmount(),
            currency: "EUR",
            counterpartyName: supermarkt,
            counterpartyIban: iban,
            description: `Grocery shopping at ${supermarkt} for ${year}-${monthString}`,
            direction: "OUTGOING",
            status: "BOOKED"
        };

        transactions.push(transaction);
    }

    return transactions;
}

function getRandomSupermarkt(): string {
    const randomIndex = Math.floor(Math.random() * supermarktNamen.length);
    return supermarktNamen[randomIndex];
}

function getRandomTransactionAmount(): number {
    const min = 18;
    const max = 95;
    const amount = Math.random() * (max - min) + min;
    return Number.parseFloat(amount.toFixed(2));
}

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getUniqueRandomDay(usedDays: Set<number>, minDay: number, maxDay: number): number {
    let day = getRandomInt(minDay, maxDay);

    while (usedDays.has(day)) {
        day = getRandomInt(minDay, maxDay);
    }

    usedDays.add(day);
    return day;
}