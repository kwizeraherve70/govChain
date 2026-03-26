import { createSlice } from "@reduxjs/toolkit";
import { ProgramCitizensThunk } from "../action/ProgramCitizens";

const initialState = {
    Loading: false,
    ProgramCitizens: null,
    Error: null,
}

const ProgramCitizensSlice= createSlice({
    name: "ProgramCitizens",
    initialState,
    reducers: {

    },

    extraReducers: {
      [ProgramCitizensThunk.pending] : (state) =>{
        return{
            ...state,
            Loading: true
        }
      },
      [ProgramCitizensThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            Loading:false,
            Error:payload
        }
      },
      [ProgramCitizensThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            Loading: false,
            ProgramCitizens: payload
        }
      }  
    }
})

export default ProgramCitizensSlice.reducer