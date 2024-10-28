import { createSlice } from "@reduxjs/toolkit";

export const snackBarSlice = createSlice({
  name: "snackBar",
  initialState: {
    open: false,
  },
  reducers: {
    openSnackBar: (state) => {
      state.open = true;
    },
    closeSnackBar: (state) => {
      state.open = false;
    },
  },
});

export const { openSnackBar, closeSnackBar } = snackBarSlice.actions;
