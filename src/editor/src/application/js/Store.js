import { configureStore } from '@reduxjs/toolkit';
import { workbenchReducer } from './features/workbenchSlice.js';
import { previewPaneReducer } from './features/previewPaneSlice.js';
import { materialListPaneReducer } from './features/materialListPaneSlice.js';

export const store = configureStore({
  reducer: {
    workbench: workbenchReducer,
    previewPane: previewPaneReducer,
    materialListPane: materialListPaneReducer,
  }
});
