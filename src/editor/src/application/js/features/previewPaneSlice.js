import { createSlice } from '@reduxjs/toolkit';

export const previewPaneSlice = createSlice({
  name: 'previewPane',
  initialState: {
    previewObject: 'cube',
    isRotating: true
  },
  reducers: {
    changePreviewObject: (state, action) => {
      state.previewObject = action.payload;
    },
    toggleIsRotating: (state, action) => {
      state.isRotating = action.payload;
    }
  }
});

export const { changePreviewObject, toggleIsRotating } = previewPaneSlice.actions;
export const selectCurrentPreviewPaneObject = (state) => state.previewPane.previewObject;
export const selectIsPreviewPaneObjectRotating = (state) => state.previewPane.isRotating;
export const previewPaneReducer = previewPaneSlice.reducer;
