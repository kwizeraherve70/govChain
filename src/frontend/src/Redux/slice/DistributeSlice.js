import { createSlice } from "@reduxjs/toolkit";
import { DistributeThunk } from "../action/Distribute";

const initialState = {
    Dloading: false,
    Distribute: null,
    Derror: null,
}

const DistributeSlice= createSlice({
    name: "Distribute",
    initialState,
    reducers: {

    },

    extraReducers: {
      [DistributeThunk.pending] : (state) =>{
        return{
            ...state,
            Dloading: true
        }
      },
      [DistributeThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            Dloading:false,
            Derror:payload
        }
      },
      [DistributeThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            Dloading: false,
            Distribute: payload
        }
      }  
    }
})

export default  DistributeSlice.reducer