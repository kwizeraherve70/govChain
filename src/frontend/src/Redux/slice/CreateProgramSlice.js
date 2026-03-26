import { createSlice } from "@reduxjs/toolkit";
import { CreateProgramThunk } from "../action/CreateProgram";

const initialState = {
    loading: false,
    program: null,
    errorz: null,
}

const CreateProgramSlice= createSlice({
    name: "Program",
    initialState,
    reducers: {

    },

    extraReducers: {
      [CreateProgramThunk.pending] : (state) =>{
        return{
            ...state,
            loading: true
        }
      },
      [CreateProgramThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            loading:false,
            errorz:payload
        }
      },
      [CreateProgramThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            loading: false,
            program: payload
        }
      }  
    }
})

export default CreateProgramSlice.reducer