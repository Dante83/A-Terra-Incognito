import { createSlice } from '@reduxjs/toolkit';

export const materialListPaneSlice = createSlice({
  name: 'materialListPane',
  initialState: {
    newMaterialModelVisible: false,
    deleteMaterialModelVisible: false,
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
    changeAddMaterialModelVisibility: (state, action) => {
      //Make the new material model visible/invisible
      state.newMaterialModelVisible = action.payload;
    },
    addMaterial: (state, action) => {
      //Check the file name doesn't already exists
      const newMaterialMaterial = action.payload;
      const propertyNames = Object.keys(state.materialGraphs).map(x => x.toLowerCase);

      //If not, copy the data over to the new file from the payload
      if( !propertyNames.includes(newMaterialMaterial.name.toLowerCase()) ){
        state.materialGraphs[newMaterialMaterial.name] = {...newMaterialMaterial.data};
      }

      //Switch to the new material once it has been created
      state.activeMaterial = newMaterialMaterial.name;
    },
    changeRemoveMaterialModelVisibility: (state, action) => {
      //Make the delete material model visible/invisible
      state.deleteMaterialModelVisible = action.payload;
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

export const { changeAddMaterialModelVisibility, addMaterial, changeRemoveMaterialModelVisibility, removeMaterial, viewMaterialGraph } = materialListPaneSlice.actions;
export const selectActiveMaterial = (state) => state.materialListPane.activeMaterial;
export const selectMaterialList = (state) => state.materialListPane.materialGraphs;
export const newMaterialModalVisible = (state) => state.newMaterialModelVisible;
export const deleteMaterialModalVisible = (state) => state.deleteMaterialModelVisible;
export const materialListPaneReducer = materialListPaneSlice.reducer;
