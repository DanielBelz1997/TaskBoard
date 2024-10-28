import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: [],
};

export const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    setRows: (state, action) => {
      state.rows = action.payload;
    },
    updateRow: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.rows.findIndex((row) => row.id === id);
      if (index !== -1) {
        state.rows[index] = { ...state.rows[index], ...updatedData };
      }
    },
    deleteRow: (state, action) => {
      state.rows = state.rows.filter((row) => row.id !== action.payload);
    },
  },
});

export const { setRows, updateRow, deleteRow } = apiSlice.actions;
