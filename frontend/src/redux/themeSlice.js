import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDarkMode: JSON.parse(localStorage.getItem("isDarkMode")) || false,
  },
  reducers: {
    toggleTheme(state) {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("isDarkMode", JSON.stringify(state.isDarkMode));
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
