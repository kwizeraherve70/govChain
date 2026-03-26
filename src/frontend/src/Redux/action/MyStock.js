import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError } from "../../utils/toast";
import { GetStore } from "@/utils/endpoints";

export const GetStoreThunk = createAsyncThunk("GetStore",
async(data,{rejectWithValue})=>{
    try{
       const repo = await GetStore();
       if(repo.Ok){
        return repo.Ok
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