import { createSlice, current } from '@reduxjs/toolkit';
import { RepeatWrapping, ClampToEdgeWrapping, MirroredRepeatWrapping} from 'three';

function determineMaterialWrapping(wrapString){
  let outWrapValue = ClampToEdgeWrapping;
  switch(wrapString){
    case 'clamp_to_edge':
      outWrapValue = ClampToEdgeWrapping;
      break;
    case 'repeat':
      outWrapValue = RepeatWrapping;
      break;
    case 'mirrored_repeat':
      outWrapValue = MirroredRepeatWrapping;
      break;
    default:
      break;
  }
  return outWrapValue;
}

export const materialListPaneSlice = createSlice({
  name: 'materialListPane',
  initialState: {
    deleteMaterialAlertVisible: false,
    activeMaterial: 'Terrain Heightmap',
    materialGraphs: {
      'Terrain Heightmap': {
        textureResolution: 512,
        textureKeys: {},
        compiledFragmentShader: "",
        materialGraph: {},
        materialComments: {},
        compiledVertexShader: "",
        outputMaterialType: 'rgb32',
        wrapS: ClampToEdgeWrapping,
        wrapW: ClampToEdgeWrapping
      },
      'Terrain Material Map': {
        textureResolution: 512,
        textureKeys: {},
        compiledFragmentShader: "",
        materialGraph: {},
        materialComments: {},
        compiledVertexShader: "",
        outputMaterialType: 'materialMap',
        wrapS: ClampToEdgeWrapping,
        wrapW: ClampToEdgeWrapping
      }
    }
  },
  reducers: {
    createOrUpdateMaterial: (state, action) => {
      //Get information from the current form and create a new material from this information
      const payload = action.payload;
      const materialName = payload.materialName;
      if(payload.isUpdate){
        state.materialGraphs[materialName].outputTextureWidth = payload.outputTextureWidth.value;
        state.materialGraphs[materialName].outputTextureHeight = payload.outputTextureHeight.value;
        state.materialGraphs[materialName].outputMaterialType = payload.outputMaterialType.value;
        state.materialGraphs[materialName].wrapS = payload.wrapS.value;
        state.materialGraphs[materialName].wrapW = payload.wrapW.value;
      }
      else{
        state.materialGraphs[payload.materialName.value] = {
          outputTextureWidth: payload.outputTextureWidth.value,
          outputTextureHeight: payload.outputTextureHeight.value,
          outputMaterialType: payload.outputMaterialType.value,
          wrapS: determineMaterialWrapping(payload.wrapS.value),
          wrapW: determineMaterialWrapping(payload.wrapW.value),
          textureKeys: {},
          compiledFragmentShader: "",
          materialGraph: {},
          materialComments: {},
          compiledVertexShader: ""
        };
      }
    },
    showRemoveMaterialAlert: (state, action) => {
      //Make the delete material modal visible/invisible
      state.deleteMaterialAlertVisible = true;
    },
    hideRemoveMaterialAlert: (state, action) => {
      //Make the delete material modal visible/invisible
      state.deleteMaterialAlertVisible = false;
    },
    removeMaterial: (state, action) => {
      //Make sure this isn't a protected Material
      const currentState = current(state);
      const arrayKeys = Object.keys(currentState.materialGraphs);
      if(arrayKeys.includes(action.payload) && action.payload !== 'Terrain Heightmap' &&  action.payload !== 'Terrain Material Map'){
        const currentIndex = arrayKeys.indexOf(action.payload);
        const {[action.payload]: value, ...materialGraphsWithoutThisMaterial } = currentState.materialGraphs;
        state.materialGraphs = materialGraphsWithoutThisMaterial;
        state.activeMaterial = arrayKeys[currentIndex + 1 >= arrayKeys.length ? currentIndex - 1 : currentIndex + 1];
      }
      state.deleteMaterialAlertVisible = false;
    },
    viewMaterialGraph: (state, action) => {
      state.activeMaterial = action.payload;
    },
    updateMaterialNodes: (state, action) => {
      state.materialGraphs[state.activeMaterial].materialGraph = action.payload;
    },
    updateMaterialComments: (state, action) => {
      state.materialGraphs[state.activeMaterial].materialComments = action.payload;
    }
  }
});

export const { createOrUpdateMaterial, showRemoveMaterialAlert, hideRemoveMaterialAlert, removeMaterial,
viewMaterialGraph, updateMaterialNodes, updateMaterialComments } = materialListPaneSlice.actions;
export const selectActiveMaterial = (state) => state.materialListPane.activeMaterial;
export const selectMaterialList = (state) => state.materialListPane.materialGraphs;
export const selectDeleteMaterialAlertVisible = (state) => state.materialListPane.deleteMaterialAlertVisible;
export const selectActiveNodes = function(state){
  const materialGraphs = state.materialListPane.materialGraphs;
  const activeMaterial = state.materialListPane.activeMaterial;
  if(activeMaterial && materialGraphs.hasOwnProperty(activeMaterial)){
    const nodes = materialGraphs[activeMaterial].materialGraph;
    return !!nodes ? nodes : {};
  }
}
export const selectActiveComments = function(state){
  const materialGraphs = state.materialListPane.materialGraphs;
  const activeMaterial = state.materialListPane.activeMaterial;
  if(activeMaterial && materialGraphs.hasOwnProperty(activeMaterial)){
    const comments = materialGraphs[activeMaterial].materialComments;
    return !!comments ? comments : {};
  }
}
export const materialListPaneReducer = materialListPaneSlice.reducer;
