import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError } from "../../utils/toast";
import { ViewRequest } from "@/utils/endpoints";

const getRoleFallbackPath = () =>
    window.location.pathname.startsWith("/Leader") ? "/Leader/Programs" : "/Admin/Programs";

export const ViewRequestThunk = createAsyncThunk("ViewRequest",
async(data,{rejectWithValue})=>{
    try{
       const repo = await ViewRequest(data);
       if(repo.Ok){
        return repo.Ok
       }else if(repo.Err){
        {repo.Err.Error && ToastError(repo.Err.Error)}
        {repo.Err.Err && ToastError(repo.Err.Err)}
        {repo.Err.NotFound && ToastError(repo.Err.NotFound)}
        {repo.Err.InvalidPayload && ToastError(repo.Err.InvalidPayload)}
        {repo.Err.NoProfile && (ToastError(repo.Err.NoProfile),
            setTimeout(()=>{window.location.href=getRoleFallbackPath()}, 3000))}
        {repo.Err.Unauthorized && (ToastError(repo.Err.Unauthorized),
            setTimeout(()=>{window.location.href=getRoleFallbackPath()}, 3000))}
        return rejectWithValue(repo.Err)
       }

    }catch(error){
        return rejectWithValue(error.message)
    }
}
);