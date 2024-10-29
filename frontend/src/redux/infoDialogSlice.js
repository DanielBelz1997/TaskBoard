import { createSlice } from "@reduxjs/toolkit";

export const infoDialogSlice = createSlice({
  name: "infoDialog",
  initialState: {
    open: false,
  },
  reducers: {
    openInfoDialog: (state, action) => {
      state.open = true;
      state.selectedRowId = action.payload;
    },
    closeInfoDialog: (state) => {
      state.open = false;
      state.selectedRowId = null;
    },
  },
});

export const { openInfoDialog, closeInfoDialog } = infoDialogSlice.actions;

