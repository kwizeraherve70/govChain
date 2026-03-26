import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError, ToastSuccess } from "../../utils/toast";
import  { ApproveRequest } from "../../utils/endpoints"

export const ApproveRequestThunk = createAsyncThunk("ApproveRequest",
async(data,{rejectWithValue})=>{
    try{
        const { ProgramId,ProfileId } = data;
       const repo = await ApproveRequest(ProgramId,ProfileId);
       if(repo.Ok){
        ToastSuccess("Approved!")
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