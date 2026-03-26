import { createSlice } from "@reduxjs/toolkit";
import { CreateProfileThunk } from "../action/createProfile";

const initialState = {
    load: false,
    profile: null,
    error: null,
}

const CreateProfileSlice= createSlice({
    name: "Profile",
    initialState,
    reducers: {

    },

    extraReducers: {
      [CreateProfileThunk.pending] : (state) =>{
        return{
            ...state,
            load: true
        }
      },
      [CreateProfileThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            load:false,
            error:payload
        }
      },
      [CreateProfileThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            load: false,
            profile: payload
        }
      }  
    }
})

export default CreateProfileSlice.reducer