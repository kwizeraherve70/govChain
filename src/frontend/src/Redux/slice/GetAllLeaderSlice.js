import { createSlice } from "@reduxjs/toolkit";
import { GetAllLeaderThunk  } from "../action/GetAllLeader";

const initialState = {
    loading: false,
    GetAllLeader: null,
    error: null,
}

const GetAllLeaderSlice= createSlice({
    name: "GetAllLeader",
    initialState,
    reducers: {

    },

    extraReducers: {
      [GetAllLeaderThunk.pending] : (state) =>{
        return{
            ...state,
            loading: true
        }
      },
      [GetAllLeaderThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            loading:false,
            error:payload
        }
      },
      [GetAllLeaderThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            loading: false,
            GetAllLeader: payload
        }
      }  
    }
})

export default GetAllLeaderSlice.reducer