import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError } from "../../utils/toast";
import { StockStats } from "../../utils/endpoints";

export const StockStatsThunk = createAsyncThunk("StockStats",
async(data,{rejectWithValue})=>{
    try{
       const repo = await StockStats();
       if(repo.Ok){
        return repo.Ok
       }else if(repo.Err){
        {repo.Err.Error && ToastError(repo.Err.Error)}
        return rejectWithValue(repo.Err)
       }

    }catch(error){
        return rejectWithValue(error.Err)
    }
}
);