import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError, ToastSuccess } from "../../utils/toast";
import { ApproveTransaction } from "../../utils/endpoints";

export const ApproveTransactionThunk = createAsyncThunk("ApproveTransaction",
async(TransactionId, { rejectWithValue }) => {
    try {
        console.log('the issue is here ', TransactionId)
       const repo = await ApproveTransaction(TransactionId);
       if (repo.Ok) {
        ToastSuccess("Transaction approved");
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
