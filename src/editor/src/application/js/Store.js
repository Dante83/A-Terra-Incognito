import { configureStore } from '@reduxjs/toolkit';
import { workbenchReducer } from './features/workbenchSlice.js';
import { previewPaneReducer } from './features/previewPaneSlice.js';
import { materialListPaneReducer } from './features/materialListPaneSlice.js';
import { newMaterialModalReducer } from './features/newMaterialModalSlice.js';
import { directoryTreeReducer } from './features/directoryTreeSlice.js';
import { newFolderModalReducer } from './features/newFolderModalSlice.js';

export const store = configureStore({
  reducer: {
    workbench: workbenchReducer,
    previewPane: previewPaneReducer,
    materialListPane: materialListPaneReducer,
    newMaterialModal: newMaterialModalReducer,
    directoryTree: directoryTreeReducer,
    newFolderModal: newFolderModalReducer,
  }
});
