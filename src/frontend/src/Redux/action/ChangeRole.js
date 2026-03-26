import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError, ToastSuccess } from "../../utils/toast";
import { ChangeRole } from "@/utils/endpoints";

export const ChangeRoleThunk = createAsyncThunk("ChangeRole",
async(data,{rejectWithValue})=>{
    try{
       const repo = await ChangeRole(data);
       if(repo.Ok){
        ToastSuccess("Changed")
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