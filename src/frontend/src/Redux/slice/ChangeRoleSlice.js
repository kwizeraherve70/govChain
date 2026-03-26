import { createSlice } from "@reduxjs/toolkit";
import { ChangeRoleThunk } from "../action/ChangeRole";

const initialState = {
    load: false,
    ChangeRole: null,
    error: null,
}

const ChangeRoleSlice= createSlice({
    name: "ChangeRole",
    initialState,
    reducers: {

    },

    extraReducers: {
      [ChangeRoleThunk.pending] : (state) =>{
        return{
            ...state,
            load: true
        }
      },
      [ChangeRoleThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            load:false,
            error:payload
        }
      },
      [ChangeRoleThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            load: false,
            ChangeRole: payload
        }
      }  
    }
})

export default ChangeRoleSlice.reducer