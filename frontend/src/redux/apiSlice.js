import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: [],
  row: null,
  updatedRow: null,
};

export const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    setRows: (state, action) => {
      state.rows = action.payload;
    },
    setRow: (state, action) => {
      state.row = action.payload;
    },
    updateRow: (state, action) => {
      state.updatedRow = action.payload;
    },
    deleteRow: (state, action) => {
      state.rows = state.rows.filter((row) => row.id !== action.payload);
    },
  },
});

export const { setRows, setRow, updateRow, deleteRow } = apiSlice.actions;
