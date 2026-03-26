import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError, ToastSuccess } from "../../utils/toast";
import { GetAllProgram } from "@/utils/endpoints";

export const GetAllProgramThunk = createAsyncThunk("GetAllPrograms",
async(data,{rejectWithValue})=>{
    try{
       const repo = await GetAllProgram() ;
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