import {BulkTransactionRequest} from "../models/BulkTransactionRequest";
import axios from "axios";

export async function sendBulkTransactions(payload: BulkTransactionRequest) {
    return axios.post("http://localhost:8081/api/transactions/bulk", payload);
}
