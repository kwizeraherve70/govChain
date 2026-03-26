import { createSlice } from "@reduxjs/toolkit";
import { GetStoreThunk } from "../action/MyStock";

const initialState = {
    loading: false,
    GetStore: null,
    errorz: null,
}

const GetStoreSlice= createSlice({
    name: "GetStore",
    initialState,
    reducers: {

    },

    extraReducers: {
      [GetStoreThunk.pending] : (state) =>{
        return{
            ...state,
            loading: true
        }
      },
      [GetStoreThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            loading:false,
            Errorz:payload
        }
      },
      [GetStoreThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            loading: false,
            GetStore: payload
        }
      }  
    }
})

export default GetStoreSlice.reducer