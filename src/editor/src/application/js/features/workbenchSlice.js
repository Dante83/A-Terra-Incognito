import { createSlice } from '@reduxjs/toolkit';

export const workbenchSlice = createSlice({
  name: 'workbench',
  initialState: {
    activeView: 'assets-view-tab'
  },
  reducers: {
    changeWorkbenchView: (state, action) => {
      state.activeView = action.payload;
    }
  }
});

export const { changeWorkbenchView } = workbenchSlice.actions;
export const selectWorkbenchView = (state) => state.workbench.activeView;
export const workbenchReducer = workbenchSlice.reducer;
