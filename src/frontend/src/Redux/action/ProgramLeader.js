import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError, ToastSuccess } from "../../utils/toast";
import { ProgramLeaders } from "@/utils/endpoints";

export const ProgramLeadersThunk = createAsyncThunk("ProgramLeaders",
async(data,{rejectWithValue})=>{
    try{
        const { ProgramId } =data
       const repo = await ProgramLeaders(ProgramId) ;
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