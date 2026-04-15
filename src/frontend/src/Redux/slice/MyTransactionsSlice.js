import { createSlice } from "@reduxjs/toolkit";
import { MyTransactionsThunk } from "../action/MyTransactions";

const initialState = { load: false, MyTransactions: null, error: null };

const MyTransactionsSlice = createSlice({
    name: "MyTransactions",
    initialState,
    reducers: {},
    extraReducers: {
        [MyTransactionsThunk.pending]: (state) => ({ ...state, load: true }),
        [MyTransactionsThunk.rejected]: (state, { payload }) => ({ ...state, load: false, error: payload }),
        [MyTransactionsThunk.fulfilled]: (state, { payload }) => ({ ...state, load: false, MyTransactions: payload }),
    }
});

export default MyTransactionsSlice.reducer;
