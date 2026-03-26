import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError } from "../../utils/toast";
import { ViewRequest } from "@/utils/endpoints";

export const ViewRequestThunk = createAsyncThunk("ViewRequest",
async(data,{rejectWithValue})=>{
    try{
       const repo = await ViewRequest(data);
       if(repo.Ok){
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