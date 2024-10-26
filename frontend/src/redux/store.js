import { configureStore } from "@reduxjs/toolkit";

import { uiSlice } from "./uiSlice.js";
import { themeSlice } from "./themeSlice.js";

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    theme: themeSlice.reducer,
  },
});
