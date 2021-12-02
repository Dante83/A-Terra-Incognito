import { createSlice } from '@reduxjs/toolkit';

export const materialListPaneSlice = createSlice({
  name: 'materialListPane',
  initialState: {
    newMaterialModalVisible: false,
    deleteMaterialModalVisible: false,
    activeMaterial: 'Terrain Heightmap',
    materialGraphs: {
      'Terrain Heightmap': {
        textureResolution: 512,
        textureKeys: {},
        compiledFragmentShader: "",
        compiledVertexShader: "",
        historyValue: 0,
        materialGraph: {},
        history: {},
      },
      'Terrain Material Map': {
        textureResolution: 512,
        textureKeys: {},
        compiledFragmentShader: "",
        compiledVertexShader: "",
        historyValue: 0,
        materialGraph: {},
        history: {},
      }
    }
  },
  reducers: {
    changeAddMaterialModalVisibility: (state, action) => {
      //Make the new material modal visible/invisible
      state.newMaterialModalVisible = action.payload;
    },
    addMaterial: (state, action) => {
      //Get information from the current form and create a new material from this information
    },
    changeRemoveMaterialModalVisibility: (state, action) => {
      //Make the delete material modal visible/invisible
      state.deleteMaterialModalVisible = action.payload;
    },
    removeMaterial: (state, action) => {
      //Make sure this isn't a protected Material

      //Check for this material name in any of our files and delete them/recompile
      //our materials and our output material.
      state.activeMaterial = action.payload; //TODO: Replace this
    },
    viewMaterialGraph: (state, action) => {
      state.activeMaterial = action.payload;
    }
  }
});

export const { changeAddMaterialModalVisibility, addMaterial, changeRemoveMaterialModalVisibility, removeMaterial, viewMaterialGraph } = materialListPaneSlice.actions;
export const selectActiveMaterial = (state) => state.materialListPane.activeMaterial;
export const selectMaterialList = (state) => state.materialListPane.materialGraphs;
export const selectNewMaterialModalVisible = (state) => state.materialListPane.newMaterialModalVisible;
export const selectDeleteMaterialModalVisible = (state) => state.materialListPane.deleteMaterialModalVisible;
export const materialListPaneReducer = materialListPaneSlice.reducer;
