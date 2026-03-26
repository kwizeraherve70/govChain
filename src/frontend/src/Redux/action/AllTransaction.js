import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError, ToastSuccess } from "../../utils/toast";
import { AllTransactions } from "@/utils/endpoints";

export const AllTransactionsThunk = createAsyncThunk("AllTransactions",
async(data,{rejectWithValue})=>{
    try{
       const repo = await AllTransactions();
       if(repo.Ok){
        // Check if data is grouped by status, if so flatten it
        const data = repo.Ok;
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          // Data is grouped by status, flatten it
          const flatData = [];
          for (const status in data) {
            if (Array.isArray(data[status])) {
              flatData.push(...data[status]);
            }
          }
          return flatData;
        }
        // If already an array, return as is
        return Array.isArray(data) ? data : [];
       }else if(repo.Err){
        {repo.Err.Error && ToastError(repo.Err.Error)}
        {repo.Err.NotFound && ToastError(repo.Err.NotFound)}
        return rejectWithValue(repo.Err)
       }

    }catch(error){
        return rejectWithValue(error.Err)
    }
}
);