import { createSlice } from "@reduxjs/toolkit";
import  { StockStatsThunk  } from "../action/StockStat"

const initialState = {
    loadingS: false,
    StockStats: null,
    ErrorZ: null,
}

const StockStatsSlice= createSlice({
    name: "StockStats",
    initialState,
    reducers: {

    },

    extraReducers: {
      [StockStatsThunk.pending] : (state) =>{
        return{
            ...state,
            loadingS: true
        }
      },
      [StockStatsThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            loadingS:false,
            ErrorZ:payload
        }
      },
      [StockStatsThunk.fulfilled]: (state,{payload}) => {
        console.log(payload)
        return {
            ...state,
            loadingS: false,
            StockStats: payload
        }
      }  
    }
})

export default  StockStatsSlice.reducer