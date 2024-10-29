import { configureStore } from "@reduxjs/toolkit";

import { uiSlice } from "./uiSlice.js";
import { apiSlice } from "./apiSlice.js";
import { themeSlice } from "./themeSlice.js";
import { snackBarSlice } from "./snackBarSlice.js";
import { infoDialogSlice } from "./infoDialogSlice.js";
import { snackBarUpdateSlice } from "./snackBarUpdate.js";
import { snackBarDeleteSlice } from "./snackBarDelete.js";
import { updateDialogSlice } from "./updateDialogSlice.js";
import { createDialogSlice } from "./createDialogSlice.js";

export const store = configureStore({
  reducer: {
    api: apiSlice.reducer,
    ui: uiSlice.reducer,
    theme: themeSlice.reducer,
    snackBar: snackBarSlice.reducer,
    infoDialog: infoDialogSlice.reducer,
    updateDialog: updateDialogSlice.reducer,
    createDialog: createDialogSlice.reducer,
    deleteSnackBar: snackBarDeleteSlice.reducer,
    updateSnackBar: snackBarUpdateSlice.reducer,
  },
});

