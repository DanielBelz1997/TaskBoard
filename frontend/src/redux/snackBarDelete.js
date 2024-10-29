import { createSlice } from "@reduxjs/toolkit";

export const snackBarDeleteSlice = createSlice({
  name: "deleteSnackBar",
  initialState: {
    open: false,
  },
  reducers: {
    openDeleteSnackBar: (state) => {
      state.open = true;
    },
    closeDeleteSnackBar: (state) => {
      state.open = false;
    },
  },
});

export const { openDeleteSnackBar, closeDeleteSnackBar } =
  snackBarDeleteSlice.actions;
