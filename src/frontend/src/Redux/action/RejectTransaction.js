import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError, ToastSuccess } from "../../utils/toast";
import { RejectTransaction } from "../../utils/endpoints";

export const RejectTransactionThunk = createAsyncThunk("RejectTransaction",
async(TransactionId, { rejectWithValue }) => {
    try {
       const repo = await RejectTransaction(TransactionId);
       if (repo.Ok) {
        ToastSuccess("Transaction rejected");
        return repo.Ok;
       } else if (repo.Err) {
        repo.Err.Error && ToastError(repo.Err.Error);
        repo.Err.NotFound && ToastError(repo.Err.NotFound);
        repo.Err.NoProfile && (ToastError(repo.Err.NoProfile), setTimeout(() => { window.location.href = "/"; }, 3000));
        repo.Err.Unauthorized && ToastError(repo.Err.Unauthorized);
        return rejectWithValue(repo.Err);
       }
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
