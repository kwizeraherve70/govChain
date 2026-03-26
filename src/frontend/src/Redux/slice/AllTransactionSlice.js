import { createSlice } from "@reduxjs/toolkit";
import { AllTransactionsThunk } from "../action/AllTransaction";

const initialState = {
    load: false,
    AllTransactions: null,
    error: null,
}

const AllTransactionsSlice= createSlice({
    name: "AllTransactions",
    initialState,
    reducers: {

    },

    extraReducers: {
      [AllTransactionsThunk.pending] : (state) =>{
        return{
            ...state,
            load: true
        }
      },
      [AllTransactionsThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            load:false,
            error:payload
        }
      },
      [AllTransactionsThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            load: false,
            AllTransactions: payload
        }
      }  
    }
})

export default AllTransactionsSlice.reducer