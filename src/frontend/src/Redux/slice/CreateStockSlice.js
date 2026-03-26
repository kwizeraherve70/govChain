import { createSlice } from "@reduxjs/toolkit";
import { CreateStockThunk } from "../action/CreateStock";

const initialState = {
    load: false,
    Stock: null,
    error: null,
}

const CreateStockSlice= createSlice({
    name: "CreateStock",
    initialState,
    reducers: {

    },

    extraReducers: {
      [CreateStockThunk.pending] : (state) =>{
        return{
            ...state,
            load: true
        }
      },
      [CreateStockThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            load:false,
            error:payload
        }
      },
      [CreateStockThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            load: false,
            Stock: payload
        }
      }  
    }
})

export default CreateStockSlice.reducer