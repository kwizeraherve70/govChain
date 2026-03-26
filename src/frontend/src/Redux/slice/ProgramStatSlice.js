import { createSlice } from "@reduxjs/toolkit";
import { ProgramStatsThunk } from "../action/ProgramStat";

const initialState = {
    loadingS: false,
    ProgramStats: null,
    ErrorZ: null,
}

const ProgramStatSlice= createSlice({
    name: "ProgramStat",
    initialState,
    reducers: {

    },

    extraReducers: {
      [ProgramStatsThunk.pending] : (state) =>{
        return{
            ...state,
            loadingS: true
        }
      },
      [ProgramStatsThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            loadingS:false,
            ErrorZ:payload
        }
      },
      [ProgramStatsThunk.fulfilled]: (state,{payload}) => {
        console.log(payload)
        return {
            ...state,
            loadingS: false,
            ProgramStats: payload
        }
      }  
    }
})

export default  ProgramStatSlice.reducer