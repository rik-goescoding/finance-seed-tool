import {createSeedAccount, createSeedTransactions} from "./generators/transaction-generator";
import {sendBulkTransactions} from "./clients/transaction-client";

const payload = {
    account: createSeedAccount(),
    transactions: createSeedTransactions(12)
}

//console.log(JSON.stringify(payload, null, 2));

async function run() {
    try {
        await sendBulkTransactions(payload);
        console.log("Upload successful!");
    } catch (error: any) {
        console.error("Error:", error.message);
    }
}

run().catch(error => {
    console.error("Unhandled error:", error);
});