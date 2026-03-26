import { createSlice } from "@reduxjs/toolkit";
import { GetAllProfileThunk } from "../action/GetAllProfile";

const initialState = {
    loading: false,
    GetAllProfile: null,
    error: null,
}

const GetAllProfileSlice= createSlice({
    name: "AllProfile",
    initialState,
    reducers: {

    },

    extraReducers: {
      [GetAllProfileThunk.pending] : (state) =>{
        return{
            ...state,
            loading: true
        }
      },
      [GetAllProfileThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            loading:false,
            error:payload
        }
      },
      [GetAllProfileThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            loading: false,
            GetAllProfile: payload
        }
      }  
    }
})

export default GetAllProfileSlice.reducer