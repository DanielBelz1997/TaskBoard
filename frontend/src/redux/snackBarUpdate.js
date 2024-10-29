import { createSlice } from "@reduxjs/toolkit";

export const snackBarUpdateSlice = createSlice({
  name: "updateSnackBar",
  initialState: {
    open: false,
  },
  reducers: {
    openUpdateSnackBar: (state) => {
      state.open = true;
    },
    closeUpdateSnackBar: (state) => {
      state.open = false;
    },
  },
});

export const { openUpdateSnackBar, closeUpdateSnackBar } =
  snackBarUpdateSlice.actions;
