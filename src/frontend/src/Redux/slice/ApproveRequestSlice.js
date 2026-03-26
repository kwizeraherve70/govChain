import { createSlice } from "@reduxjs/toolkit";
import { ApproveRequestThunk } from "../action/ApproveRequest";

const initialState = {
    load: false,
    ApproveRequest: null,
    error: null,
}

const ApproveRequestSlice= createSlice({
    name: "Approverequest",
    initialState,
    reducers: {

    },

    extraReducers: {
      [ApproveRequestThunk.pending] : (state) =>{
        return{
            ...state,
            load: true
        }
      },
      [ApproveRequestThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            load:false,
            error:payload
        }
      },
      [ApproveRequestThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            load: false,
            ApproveRequest: payload
        }
      }  
    }
})

export default ApproveRequestSlice.reducer