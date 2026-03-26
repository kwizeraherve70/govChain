import { createSlice } from "@reduxjs/toolkit";
import { ViewRequestThunk } from "../action/ViewRequested";

const initialState = {
    load: false,
    ViewRequest: null,
    error: null,
}

const ViewRequestSlice= createSlice({
    name: "Viewrequest",
    initialState,
    reducers: {

    },

    extraReducers: {
      [ViewRequestThunk.pending] : (state) =>{
        return{
            ...state,
            load: true
        }
      },
      [ViewRequestThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            load:false,
            error:payload
        }
      },
      [ViewRequestThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            load: false,
            ViewRequest: payload
        }
      }  
    }
})

export default ViewRequestSlice.reducer