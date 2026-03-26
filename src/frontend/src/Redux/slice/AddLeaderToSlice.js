import { createSlice } from "@reduxjs/toolkit";
import { AddLeaderToProgramThunk } from "../action/AddLeader";

const initialState = {
    load: false,
    AddLeader: null,
    error: null,
}

const AddLeaderSlice= createSlice({
    name: "AddLeader",
    initialState,
    reducers: {

    },

    extraReducers: {
      [AddLeaderToProgramThunk.pending] : (state) =>{
        return{
            ...state,
            load: true
        }
      },
      [AddLeaderToProgramThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            load:false,
            error:payload
        }
      },
      [AddLeaderToProgramThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            load: false,
            AddLeader: payload
        }
      }  
    }
})

export default AddLeaderSlice.reducer