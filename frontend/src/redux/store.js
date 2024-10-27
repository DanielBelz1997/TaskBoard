import { configureStore } from "@reduxjs/toolkit";

import { uiSlice } from "./uiSlice.js";
import { themeSlice } from "./themeSlice.js";
import { dialogSlice } from "./dialogSlice.js";
import { apiSlice } from "./apiSlice.js";

export const store = configureStore({
  reducer: {
    api: apiSlice.reducer,
    ui: uiSlice.reducer,
    theme: themeSlice.reducer,
    dialog: dialogSlice.reducer,
  },
});
