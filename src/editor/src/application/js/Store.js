import { configureStore } from '@reduxjs/toolkit';
import { workbenchReducer } from './features/workbenchSlice.js';
import { previewPaneReducer } from './features/previewPaneSlice.js';
import { materialListPaneReducer } from './features/materialListPaneSlice.js';
import { directoryTreeReducer } from './features/directoryTreeSlice.js';

export const store = configureStore({
  reducer: {
    workbench: workbenchReducer,
    previewPane: previewPaneReducer,
    materialListPane: materialListPaneReducer,
    directoryTree: directoryTreeReducer,
  }
});
