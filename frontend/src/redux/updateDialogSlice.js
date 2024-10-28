import { createSlice } from "@reduxjs/toolkit";

export const updateDialogSlice = createSlice({
  name: "updateDialog",
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

export const { openDialog, closeDialog } = updateDialogSlice.actions;
