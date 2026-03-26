import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError } from "../../utils/toast";
import { ProgramStats } from "../../utils/endpoints";

export const ProgramStatsThunk = createAsyncThunk("ProgramStats",
async(data,{rejectWithValue})=>{
    try{
       const repo = await ProgramStats();
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