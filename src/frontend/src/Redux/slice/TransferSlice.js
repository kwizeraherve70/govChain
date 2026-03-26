import { createSlice } from "@reduxjs/toolkit";
import { TransferThunk } from "../action/Transfer";

const initialState = {
    loading: false,
    Transfer: null,
    errorz: null,
}

const TransferSlice= createSlice({
    name: "Transfer",
    initialState,
    reducers: {

    },

    extraReducers: {
      [TransferThunk.pending] : (state) =>{
        return{
            ...state,
            loading: true
        }
      },
      [TransferThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            loading:false,
            errorz:payload
        }
      },
      [TransferThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            loading: false,
            Transfer: payload
        }
      }  
    }
})

export default TransferSlice.reducer