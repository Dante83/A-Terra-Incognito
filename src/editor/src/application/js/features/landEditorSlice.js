import { createSlice, current } from '@reduxjs/toolkit';

export const landEditorSlice = createSlice({
  name: 'landEditor',
  initialState: {
    activeTool: 'paintbrush',
  },
  reducers: {
    setActiveTool: (state, action) => {
      state.activeTool = action.payload.slice(0, -4);
    }
  }
});

export const { setActiveTool } = landEditorSlice.actions;
export const selectActiveTool = (state) => {
  return state.landEditor.activeTool;
}
export const landEditorReducer = landEditorSlice.reducer;
