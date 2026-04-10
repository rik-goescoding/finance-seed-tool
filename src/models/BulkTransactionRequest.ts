import {SeedAccount} from "./SeedAccount";
import {SeedTransaction} from "./SeedTransaction";

export interface BulkTransactionRequest {

    account: SeedAccount;
    transactions: SeedTransaction[];
}