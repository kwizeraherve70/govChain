import { createSlice } from "@reduxjs/toolkit";
import { CitizenRequestThunk } from "../action/CitizenRequest";

const initialState = {
    load: false,
    CitizenRequest: null,
    error: null,
}

const CitizenRequestSlice= createSlice({
    name: "Citizenrequest",
    initialState,
    reducers: {

    },

    extraReducers: {
      [CitizenRequestThunk.pending] : (state) =>{
        return{
            ...state,
            load: true
        }
      },
      [CitizenRequestThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            load:false,
            error:payload
        }
      },
      [CitizenRequestThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            load: false,
            CitizenRequest: payload
        }
      }  
    }
})

export default CitizenRequestSlice.reducer