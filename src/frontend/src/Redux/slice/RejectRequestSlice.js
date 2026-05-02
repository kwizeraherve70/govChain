import { createSlice } from "@reduxjs/toolkit";
import { RejectRequestThunk } from "../action/RejectRequest";

const initialState = {
    load: false,
    RejectRequest: null,
    error: null,
}

const RejectRequestSlice = createSlice({
    name: "Rejectrequest",
    initialState,
    reducers: {},
    extraReducers: {
        [RejectRequestThunk.pending]: (state) => {
            return { ...state, load: true };
        },
        [RejectRequestThunk.rejected]: (state, { payload }) => {
            return { ...state, load: false, error: payload };
        },
        [RejectRequestThunk.fulfilled]: (state, { payload }) => {
            return { ...state, load: false, RejectRequest: payload };
        },
    },
});

export default RejectRequestSlice.reducer;
