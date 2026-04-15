import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError } from "../../utils/toast";
import { MyTransactions } from "../../utils/endpoints";

export const MyTransactionsThunk = createAsyncThunk("MyTransactions",
async(_, { rejectWithValue }) => {
    try {
        const repo = await MyTransactions();
        if (repo.Ok) {
            const data = repo.Ok;
            return Array.isArray(data) ? data : [];
        } else if (repo.Err) {
            repo.Err.NotFound && ToastError(repo.Err.NotFound);
            repo.Err.Error && ToastError(repo.Err.Error);
            return rejectWithValue(repo.Err);
        }
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
