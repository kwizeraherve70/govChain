import { createSlice } from "@reduxjs/toolkit";
import { GetAllProgramThunk } from "../action/GetAllProgram";

const initialState = {
    loadingz: false,
    Allprogram: null,
    Errorz: null,
}

const GetAllProgramSlice= createSlice({
    name: "AllProgram",
    initialState,
    reducers: {

    },

    extraReducers: {
      [GetAllProgramThunk.pending] : (state) =>{
        return{
            ...state,
            loadingz: true
        }
      },
      [GetAllProgramThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            loadingz:false,
            Errorz:payload
        }
      },
      [GetAllProgramThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            loadingz: false,
            Allprogram: payload
        }
      }  
    }
})

export default GetAllProgramSlice.reducer