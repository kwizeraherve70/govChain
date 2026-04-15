import { createSlice } from "@reduxjs/toolkit";
import { ApproveTransactionThunk } from "../action/ApproveTransaction";

const initialState = { loading: false, data: null, error: null };

const ApproveTransactionSlice = createSlice({
    name: "ApproveTransaction",
    initialState,
    reducers: {},
    extraReducers: {
      [ApproveTransactionThunk.pending]: (state) => ({ ...state, loading: true }),
      [ApproveTransactionThunk.rejected]: (state, { payload }) => ({ ...state, loading: false, error: payload }),
      [ApproveTransactionThunk.fulfilled]: (state, { payload }) => ({ ...state, loading: false, data: payload }),
    }
});

export default ApproveTransactionSlice.reducer;
