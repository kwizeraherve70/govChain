import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError, ToastSuccess } from "../../utils/toast";
import  { CreateProgram } from "../../utils/endpoints"

export const CreateProgramThunk = createAsyncThunk("CreateProgram",
async(data,{rejectWithValue})=>{
    try{
       const repo = await CreateProgram(data);
       if(repo.Ok){
        ToastSuccess("Create successfully")
        return repo.Ok
       }else if(repo.Err){
        {repo.Err.Error && ToastError(repo.Err.Error)}
        {repo.Err.InvalidPayload && ToastError(repo.Err.InvalidPayload)}
        {repo.Err.NoProfile&& ( ToastError(repo.Err.NoProfile),
            setTimeout(()=>{window.location.href="/"}, 3000))}
        {repo.Err.Unauthorized&& ( ToastError(repo.Err.Unauthorized),
            setTimeout(()=>{window.location.href="/"}, 3000))} 

        return rejectWithValue(repo.Err)
       }

    }catch(error){
        return rejectWithValue(error.Err)
    }
}
);