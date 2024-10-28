import { createSlice } from "@reduxjs/toolkit";

export const createDialogSlice = createSlice({
  name: "createDialog",
  initialState: {
    open: false,
  },
  reducers: {
    openDialog: (state) => {
      state.open = true;
    },
    closeDialog: (state) => {
      state.open = false;
    },
  },
});

export const { openDialog, closeDialog } = createDialogSlice.actions;
