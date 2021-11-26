import { createSlice } from '@reduxjs/toolkit';

export const resourcePaneSlice = createSlice({
  name: 'resourcePane',
  initialState: {
    activeShader: 'Terrain Shader',
    shaderGraphs: {
      'Terrain Shader': {
        textureResolution: 512,
        textureKeys: {},
        compiledFragmentShader: "",
        compiledVertexShader: "",
        historyValue: 0,
        active: {},
        history: {},
      }
    }
  },
  reducers: {
    promptAddShader: (state, action) => {
      state.activeView = action.payload;
    },
    promptRemoveShader: (state, action) => {
      state.activeView = action.payload;
    },
    viewShaderGraph: (state, action) => {
      state.activeView = action.payload;
    },
    populateShader: (state, action) = {
      state.activeView = action.payload;
    }
  }
});

export const { promptAddShader, promptRemoveShader, viewShaderGraph } = resourcePane.actions;
export const selectWorkbenchView = (state) => state.workbench.activeView;
export const workbenchReducer = workbenchSlice.reducer;
