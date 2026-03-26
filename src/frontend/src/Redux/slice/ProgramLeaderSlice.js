import { createSlice } from "@reduxjs/toolkit";
import { ProgramLeadersThunk } from "../action/ProgramLeader";

const initialState = {
    loadingz: false,
    ProgramLeaders: null,
    Errorz: null,
}

const ProgramLeadersSlice= createSlice({
    name: "ProgramLeaders",
    initialState,
    reducers: {

    },

    extraReducers: {
      [ProgramLeadersThunk.pending] : (state) =>{
        return{
            ...state,
            loadingz: true
        }
      },
      [ProgramLeadersThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            loadingz:false,
            Errorz:payload
        }
      },
      [ProgramLeadersThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            loadingz: false,
            ProgramLeaders: payload
        }
      }  
    }
})

export default ProgramLeadersSlice.reducer