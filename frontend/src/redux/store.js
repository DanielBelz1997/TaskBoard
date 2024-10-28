import { configureStore } from "@reduxjs/toolkit";

import { uiSlice } from "./uiSlice.js";
import { themeSlice } from "./themeSlice.js";
import { updateDialogSlice } from "./updateDialogSlice.js";
import { createDialogSlice } from "./createDialogSlice.js";
import { infoDialogSlice } from "./infoDialogSlice.js";
import { apiSlice } from "./apiSlice.js";

export const store = configureStore({
  reducer: {
    api: apiSlice.reducer,
    ui: uiSlice.reducer,
    theme: themeSlice.reducer,
    updateDialog: updateDialogSlice.reducer,
    createDialog: createDialogSlice.reducer,
    infoDialog: infoDialogSlice.reducer,
  },
});
