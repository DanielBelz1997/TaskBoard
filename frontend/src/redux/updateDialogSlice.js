import { createSlice } from "@reduxjs/toolkit";

export const updateDialogSlice = createSlice({
  name: "updateDialog",
  initialState: {
    open: false,
  },
  reducers: {
    openUpdateDialog: (state, action) => {
      state.open = true;
      state.selectedUpdateRowId = action.payload;
    },
    closeUpdateDialog: (state) => {
      state.open = false;
      state.selectedUpdateRowId = null;
    },
  },
});

export const { openUpdateDialog, closeUpdateDialog } =
  updateDialogSlice.actions;
