import { createSlice } from "@reduxjs/toolkit";

export const dialogSlice = createSlice({
  name: "dialog",
  initialState: {
    open: false,
    selectedRow: null,
  },
  reducers: {
    openDialog: (state, action) => {
      state.selectedRow = null;
      state.open = true;
      state.selectedRow = action.payload;
    },
    closeDialog: (state) => {
      state.open = false;
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;
