import { createSlice, current } from '@reduxjs/toolkit';
import { closeNewMaterialModal } from './newMaterialModalSlice.js';
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
    deleteMaterialModalVisible: false,
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
        state.materialGraphs[materialName] = {
          ...state.materialGraphs[materialName],
          outputTextureWidth: payload.outputTextureWidth,
          outputTextureHeight: payload.outputTextureHeight,
          outputMaterialType: payload.outputMaterialType,
          wrapS: determineMaterialWrapping(payload.wrapS),
          wrapW: determineMaterialWrapping(payload.wrapW),
        };
      }
      else{
        state.materialGraphs[materialName] = {
          outputTextureWidth: payload.outputTextureWidth,
          outputTextureHeight: payload.outputTextureHeight,
          outputMaterialType: payload.outputMaterialType,
          wrapS: determineMaterialWrapping(payload.wrapS),
          wrapW: determineMaterialWrapping(payload.wrapW),
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
      state.deleteMaterialModalVisible = true;
    },
    hideRemoveMaterialAlert: (state, action) => {
      //Make the delete material modal visible/invisible
      state.deleteMaterialModalVisible = false;
    },
    removeMaterial: (state, action) => {
      //Make sure this isn't a protected Material
      const arrayKeys = state.materialGraphs.keys();
      if(arrayKeys.includes(action.payload) &&
       action.payload !== 'Terrain Heightmap' &&  action.payload !== 'Terrain Material Map'){
        const newActiveMaterial = arrayKeys[(arrayKeys.indexOf(action.payload) -  1) % (arrayKeys.length - 1)];
        state.materialGraphs[state.activeMaterial] = null;
        state.activeMaterial = newActiveMaterial;
        state.deleteMaterialModalVisible = false;
      }
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

export const { createOrUpdateMaterial, showRemoveMaterialAlert, hidesRemoveMaterialAlert, removeMaterial,
viewMaterialGraph, updateMaterialNodes, updateMaterialComments } = materialListPaneSlice.actions;
export const selectActiveMaterial = (state) => state.materialListPane.activeMaterial;
export const selectMaterialList = (state) => state.materialListPane.materialGraphs;
export const selectDeleteMaterialModalVisible = (state) => state.materialListPane.deleteMaterialModalVisible;
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
