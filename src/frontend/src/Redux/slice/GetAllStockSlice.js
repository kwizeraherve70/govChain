import { createSlice } from "@reduxjs/toolkit";
import { GetAllStockThunk } from "../action/GetAllStock";

const initialState = {
    loading: false,
    AllStock: null,
    errorz: null,
}

const GetAllStockSlice= createSlice({
    name: "AllStocks",
    initialState,
    reducers: {

    },

    extraReducers: {
      [GetAllStockThunk.pending] : (state) =>{
        return{
            ...state,
            loading: true
        }
      },
      [GetAllStockThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            loading:false,
            errorz:payload
        }
      },
      [GetAllStockThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            loading: false,
            AllStock: payload
        }
      }  
    }
})

export default GetAllStockSlice.reducer