import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError, ToastSuccess } from "../../utils/toast";
import { AddLeaderToProgram } from "@/utils/endpoints";

export const AddLeaderToProgramThunk = createAsyncThunk("AddLeaderToProgram",
async(data,{rejectWithValue})=>{
    try{

        const  {ProgramId,LeaderId} =data;
       const repo = await AddLeaderToProgram(ProgramId,LeaderId);
       console.log(repo)
       if(repo.Ok){
        ToastSuccess("Added!!")
        return repo.Ok
       }else if(repo.Err){
        {repo.Err.Error && ToastError(repo.Err.Error)}
        {repo.Err.NotFound && ToastError(repo.Error.NotFound)}
        return rejectWithValue(repo.Err)
       }

    }catch(error){
        return rejectWithValue(error.Err)
    }
}
);