import { createSlice } from "@reduxjs/toolkit";
import { RejectTransactionThunk } from "../action/RejectTransaction";

const initialState = { loading: false, data: null, error: null };

const RejectTransactionSlice = createSlice({
    name: "RejectTransaction",
    initialState,
    reducers: {},
    extraReducers: {
      [RejectTransactionThunk.pending]: (state) => ({ ...state, loading: true }),
      [RejectTransactionThunk.rejected]: (state, { payload }) => ({ ...state, loading: false, error: payload }),
      [RejectTransactionThunk.fulfilled]: (state, { payload }) => ({ ...state, loading: false, data: payload }),
    }
});

export default RejectTransactionSlice.reducer;
